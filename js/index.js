// DOM Elements

var length_value = document.getElementById("length-value");
var password = document.getElementById("password");
var copy = document.getElementById("copy");
var clipboard = copy.children[0];
var toolTip = copy.children[1];
var length = document.getElementById("length");
var upperCase = document.getElementById("uppercase");
var lowerCase = document.getElementById("lowercase");
var numbers = document.getElementById("numbers");
var symbols = document.getElementById("symbols");
var generate = document.getElementById("generate");

// Length_value

length.oninput = function () {
	length_value.innerText = length.value;
}

// Generator functions

var getLower = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
var getUpper = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
var getNumber = () => {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
var getSpecial = () => {
	const symbols = '!@#$%^&(){}[]_=+-*/.<>,;?|`~'
	return symbols.charAt(Math.floor(Math.random() * symbols.length));
}

var generatePassword = (len,upper,lower,number,special) => {
	var generatedPassword = '';
	var typesCount = upper + lower + number + special;
	if(typesCount==0) return "; - ;";
	var typesArr = [{upper}, {lower}, {number}, {special}].filter(
		item => Object.values(item)[0]
	);
	// console.log(typesArr);
		
	for(var i = 0; i < len; i++)
	{
		var funcName = Object.keys(typesArr[Math.floor(Math.random() * typesCount)])[0];
		generatedPassword += master[funcName]();
	}
	return generatedPassword;
}

// Master function object

var master = {
	upper: getUpper,
	lower: getLower,
	number: getNumber,
	special: getSpecial
}

// Event-Listeners

generate.addEventListener('click', () => {
	const passwordLength = +length.value;
	const hasUpperCase = upperCase.checked;
	const hasLowerCase = lowerCase.checked;
	const hasNumber = numbers.checked;
	const hasSymbol = symbols.checked;

	password.innerText = generatePassword(passwordLength, hasUpperCase, hasLowerCase, hasNumber, hasSymbol);
})

copy.addEventListener('click', () => {
	// password.select();
	navigator.clipboard.writeText(password.innerText);
	clipboard.classList.replace('far', 'fa');
	clipboard.classList.replace('fa-clipboard', 'fa-check');
	toolTip.style.visibility = 'visible';
	setTimeout(() => {
		clipboard.classList.replace('fa', 'far');
		clipboard.classList.replace('fa-check', 'fa-clipboard');
		toolTip.style.visibility = 'hidden';
	}, 1500);
})