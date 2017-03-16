var fs = require('fs');
var columns = [
	"Restaurant",
	"Type of Food",
	"Item",
	"Dietary Information",
	"Serving Size",
	"Calories",
	"Calories from Fat",
	"Total Fat (g)",
	"Saturated Fat (g)",
	"Trans Fat (g)",
	"Cholesterol (mg)",
	"Sodium (mg)",
	"Carbohydrates (g)",
	"Dietary Fiber (g)",
	"Sugars (g)",
	"Protein (g)",
	"Vitamin A",
	"Vitamin C",
	"Calcium",
	"Iron",
	"Allergen Information",
	"Potassium (mg)",
	"Vitamin B6",
	"Vitamin B12",
	"Vitamin E",
	"Polyunsaturated Fat (g)",
	"Monounsaturated Fat (g)"
];
var lineNumber = 2;
var duplicates = {};
fs.readFile('./input.txt', 'utf8', function(err, data) {
	if(err) throw err;
	let sql = parseCSV(data);
	console.log(sql);
});

function parseCSV(csv) { 
	var lines = csv.split('\n');
	for(var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var info = line.split(',');
		
		for(var j = 0; j < info.length; j++) {
			if(!info[j]) {
				info[j] = 0;
			}
		}

		/*
			0 Restaurant,
			1 Type of Food,
			2 Item,
			3 Dietary Information,
			4 Serving Size,
			5 Calories,
			6 Calories from Fat,
			7 Total Fat (g),
			8 Saturated Fat (g),
			9 Trans Fat (g),
			10 Cholesterol (mg),
			11 Sodium (mg),
			12 Carbohydrates (g),
			13 Dietary Fiber (g),
			14 Sugars (g),
			15 Protein (g),
			16 Vitamin A,
			17 Vitamin C,
			18 Calcium,
			19 Iron,
			20 Allergen Information,
			21 Potassium (mg),
			22 Vitamin B6,
			23 Vitamin B12,
			24 Vitamin E,
			25 Polyunsaturated Fat (g),
			26 Monounsaturated Fat (g)
		*/

		var foodchain = info[0];
		var type = info[1];
		var name = info[2];
		var dietaryInfo = info[3];
		var servingSize = info[4];
		var calories = isNumeric(removeWhiteSpace(5)) ? removeWhiteSpace(5): 0;
		var cff = isNumeric(removeWhiteSpace(6)) ? removeWhiteSpace(6): 0;
		var fat = isNumeric(removeWhiteSpace(7)) ? removeWhiteSpace(7): 0;
		var sfat = isNumeric(removeWhiteSpace(8)) ? removeWhiteSpace(8): 0;
		var tfat = isNumeric(removeWhiteSpace(9)) ? removeWhiteSpace(9): 0;
		var cholesterol = isNumeric(removeWhiteSpace(10)) ? removeWhiteSpace(10): 0;
		var sodium = isNumeric(removeWhiteSpace(1)) ? removeWhiteSpace(11): 0;
		var carbs = isNumeric(removeWhiteSpace(12)) ? removeWhiteSpace(12): 0;
		var fiber = isNumeric(removeWhiteSpace(13)) ? removeWhiteSpace(13): 0;
		var sugar = isNumeric(removeWhiteSpace(14)) ? removeWhiteSpace(14): 0;
		var protein = isNumeric(removeWhiteSpace(15)) ? removeWhiteSpace(15): 0;
		var vitA = isNumeric(removeWhiteSpace(16)) ? removeWhiteSpace(16): 0;
		var vitC = isNumeric(removeWhiteSpace(17)) ? removeWhiteSpace(17): 0;
		var calcium = isNumeric(removeWhiteSpace(18)) ? removeWhiteSpace(18): 0;
		var iron = isNumeric(removeWhiteSpace(19)) ? removeWhiteSpace(19): 0;
		var allergenInfo = info[20];
		var potassium = isNumeric(removeWhiteSpace(21)) ? removeWhiteSpace(21): 0;
		var vitB6 = isNumeric(removeWhiteSpace(22)) ? removeWhiteSpace(22): 0;
		var vitB12 = isNumeric(removeWhiteSpace(23)) ? removeWhiteSpace(23): 0;
		var vitE = isNumeric(removeWhiteSpace(24)) ? removeWhiteSpace(24): 0;
		var pufat = isNumeric(removeWhiteSpace(25)) ? removeWhiteSpace(25): 0;
		var mufat = isNumeric(removeWhiteSpace(26)) ? removeWhiteSpace(26): 0;

		var sql = 'INSERT INTO `Food` Values(NULL,"' + 
			foodchain + '","' + type + '","' + 
			name + '","' + dietaryInfo + '","' + servingSize + '",' + 
			calories + ',' + cff + ',' + fat + ',' + 
			sfat + ',' + tfat + ',' + cholesterol + ',' + 
			sodium + ',' + carbs + ',' + fiber + ',' + 
			sugar + ',' + protein  + ',' + vitA + ',' + vitC + ',' + calcium + ',' +
			iron + ',"' + allergenInfo + '",' + potassium + ',' + vitB6 + ',' +
			vitB12 + ',' + vitE + ',' + pufat + ',' + mufat + ');';
		
		if(!(duplicates.hasOwnProperty(name) && duplicates[name].calories === calories && duplicates[name].foodchain === foodchain)) {
			console.log(sql);
			duplicates[name] = {calories: calories, foodchain: foodchain};
		}
		lineNumber++;
	}

	function removeWhiteSpace(index) {
		let str = info[index];
		if(!str) {
			console.log('error in column ' + columns[index] + ' on line ' + lineNumber);
		}
		return str.replace(/\s/g, "");

	}

	function isNumeric(obj) {
		return !isNaN(obj - parseFloat(obj));
	}
}