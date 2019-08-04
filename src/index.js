const formTag = document.querySelector('form');
let commonArray = [10, 20, 12, 30, 100, 55];
let data;
let duplicate;
let canPrint;



/**
 * Checks if the key pressed is valid.
 * @param {object} event - DOM event
 * @returns {boolean} - returns true if input is valid.
 */
const validate = (event) => {
	const currChar = event.charCode;
	let returnValue = currChar >= 48 && currChar <= 57;
	returnValue = returnValue || currChar == 44 || currChar == 45;
	return returnValue || currChar == 13;
}

/**
 * Push in commonArray if value is not repeated else push in duplicate.
 * @param {number} num - An integer.
 */
const addValue = (num) => {
	if (!data[num]) {
		data[num] = true;
		commonArray.push(num);
	} else {
		duplicate.push(num);
	}
	canPrint = true;
}

/**
 * Add all the numbers in the range from strat to end.
 * @param {string} currRange - Start and end number seperated by '-'.
 */
const insertRange = (currRange) => {
	const start = parseInt(currRange.split('-')[0]);
	const end = parseInt(currRange.split('-')[1]);
	for (let num = start; num <= end; num++) {
		addValue(num);
	}
}

/**
 * Print the results.
 */
const printArrays = () => {
	if (canPrint) {
		console.log('unique: ');
		console.log(commonArray);
		console.log('duplicates: ');
		console.log(duplicate);
	}
}

/**
 * Reset all global variables and map all the unique numbers.
 */
const resetValues = () => {
	data = {};
	duplicate = [];
	canPrint = false;
	for (let num in commonArray) {
		data[commonArray[num]] = true;
	}
}

/**
 * It will add all the elements in either commonArray or duplicate
 * @param {object} inputArray - Array of numbers and ranges.
 */
const addData = (inputArray) => {
	for (let index = 0; index < inputArray.length; index++) {
		if (inputArray[index].includes('-')) {
			insertRange(inputArray[index]);
		} else if (inputArray[index].length) {
			const currNum = parseInt(inputArray[index]);
			addValue(currNum);
		}
	}
}

/**
 * Convert input string into an Array and reset all the global variables and print the output.
 * @returns {boolean} - Redirect value.
 */
const merge = () => {
	const inputArray = formTag[0].value.split(',');
	formTag[0].value = "";
	const temp = [...commonArray];

	resetValues();
	addData(inputArray);
	printArrays();
	commonArray = [...temp];
	return false;
}