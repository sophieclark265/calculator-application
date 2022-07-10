let digits = document.querySelectorAll(".digits");
let equals = document.querySelector(".digits-equal");
let decimal = document.querySelector("#decimal");
let bottomScreen = document.querySelector(".bottom-screen"); // grab bigScreen HTML dom
let topScreen = document.querySelector(".top-screen");

let responsiveDigits = digits.forEach((digit) => {
  digit.addEventListener("click", handleDigitClick);
});
decimal.addEventListener("click", onClickDecimal);
equals.addEventListener("click", getFinalResult);

let holdAnswer = 0;
let operandChosen;
let arrayOfInputs = [];
let equalsClickedLast = false;

// operand functions
function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num1 == 0 || num2 == 0) {
    return errorMessage(); // if either input equals zero, do not divide an return error
  } else {
    let answer = num1 / num2;
    return answer;
  }
}

function minus(num1, num2) {
  return num1 - num2;
}

function handleDigitClick(event) {
  if (equalsClickedLast) {
    // whenever click event is registered on a digit, check if equals was clicked last
    // if true, then clear top screen and replace it with bottom screen result computed?
    topScreen.textContent = "";
    equalsClickedLast = false;
    // arrayOfInputs.shift();
  }

  // fill out bottom screen
  let digitChosen = event.target.innerText; // gets number or operand chosen
  if (
    digitChosen == "*" ||
    digitChosen == "/" ||
    digitChosen == "-" ||
    digitChosen == "+" ||
    digitChosen == "C"
  ) {
    arrayOfInputs.push(bottomScreen.textContent);
    // push bottomScreen digit to array if operand clicked
    crunchNumbers();
    handleNonDigitInput(digitChosen); // clear bottom screen
  } else {
    saveBottomScreenInput(digitChosen);
  }
}

function saveBottomScreenInput(digit) {
  bottomScreen.textContent += digit; // populate bottom screen with digit chosen
}

function crunchNumbers() {
  if (!arrayOfInputs[0] || !arrayOfInputs[1]) {
    return;
  }
  let num1 = arrayOfInputs[0];
  let num2 = arrayOfInputs[1];
  console.log("this is array of Inputs " + arrayOfInputs);
  let answer = getAnswer(num1, num2);
  let numberAnswer = Number(answer);
  saveComputation(numberAnswer);
}

function saveComputation(savedAnswer) {
  if (isFinite(savedAnswer)) {
    // only if finite number
    arrayOfInputs = []; // 1 + 1 is 2, delete array and push 2
    arrayOfInputs.push(savedAnswer);
  } else {
    // if holdAnswer is infinite, call error func
    topScreen.textContent = "";
    errorMessage();
  }
}

function clearAllScreens() {
  bottomScreen.textContent = "";
  topScreen.textContent = "";
  arrayOfInputs = [];
  operandChosen = 0;
}

function handleNonDigitInput(input) {
  if (input == "C") {
    clearAllScreens();
  } else {
    // if not "C" must be operand currently
    operandChosen = input;
    // assign bottomScreen text and operand chosen to top screen
    topScreen.textContent += `${bottomScreen.textContent} ${operandChosen} `;
    // clear bottom screen
    bottomScreen.textContent = ""; // reset bottom screen
  }
}

function populateTopScreen(bottomScreenText, operandChosen) {
  topScreen.textContent += bottomScreenText + operandChosen; // give top screen text that was in bottom screen
  console.log("this is array so far " + arrayOfInputs);
}

function appendBottomTextToTop() {
  topScreen.textContent += bottomScreen.textContent;
}

function getFinalResult() {
  //equalsClickedLast automatically set to false, only turned to true when this func has run
  if (equalsClickedLast) {
    return;
  }

  let num1;
  let num2;
  if (arrayOfInputs.length == 1) {
    // if only one element in array before equals pressed,
    // then first element is answer bc crunchNumbers has calculated result
    num1 = arrayOfInputs[0];
    num2 = bottomScreen.textContent;
    appendBottomTextToTop();
  } else {
    num1 = arrayOfInputs[0];
    num2 = arrayOfInputs[1];
  }

  let result = getAnswer(num1, num2);
  bottomScreen.textContent = result;
  equalsClickedLast = true;
  console.log("this is arr of inputs " + arrayOfInputs);
  arrayOfInputs = [];
}

function getAnswer(num1, num2) {
  // operand top number by bottom number
  let answer;
  if (operandChosen == "*") {
    answer = multiply(num1, num2);
  } else if (operandChosen == "/") {
    answer = divide(num1, num2);
  } else if (operandChosen == "+") {
    num1 = Number(num1);
    num2 = Number(num2);
    answer = add(num1, num2);
  } else if (operandChosen == "-") {
    answer = minus(num1, num2);
  }
  return answer;
}

function onClickDecimal(event) {
  let str = bottomScreen.textContent;
  if (str[str.length - 1] == ".") {
    return;
  }
  bottomScreen.textContent += ".";
}

function errorMessage() {
  return (bottomScreen.textContent = "Oops! Can't divide by 0.");
}

// as soon as two inputs with one operand, need to do calculation and store result
//
