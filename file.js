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

// operand functions
function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  console.log("calling divide)");
  if (num1 == 0 || num2 == 0) {
    console.log("calling error function");
    return errorMessage();
  } else {
    let answer = num1 / num2;
    return answer;
  }
}

function minus(num1, num2) {
  return num1 - num2;
}

// function operate(operator, num1, num2) {
//   let resultOfOfOperator = operator(num1, num2);
//   return resultOfOfOperator;
// }

//

function handleDigitClick(event) {
  // fill out bottom screen
  let digitChosen = event.target.innerText; // gets number or operand chosen
  if (
    digitChosen == "*" ||
    digitChosen == "/" ||
    digitChosen == "-" ||
    digitChosen == "+" ||
    digitChosen == "C"
  ) {
    crunchNumbers();
    clearBottomScreen(digitChosen); // clear bottom screen
  } else {
    saveBottomScreenInput(digitChosen);
  }
}

function saveBottomScreenInput(input) {
  bottomScreen.textContent += input; // populate bottom screen with digit chosen
  arrayOfInputs.push(input);
}

function crunchNumbers() {
  if (!arrayOfInputs[0] || !arrayOfInputs[1]) {
    return;
  }
  let num1 = arrayOfInputs[0];
  let num2 = arrayOfInputs[1];
  console.log("running execute pair func");
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

function clearBottomScreen(digitChosen) {
  if (digitChosen == "C") {
    //clear bottom screen, and/or populate top
    // clear bottom screen
    // if reset button pressed, delete bottomScreen text
    bottomScreen.textContent = "";
    topScreen.textContent = "";
    arrayOfInputs = [];
  } else {
    operandChosen = digitChosen;
    let bottomScreenText = bottomScreen.textContent;
    populateTopScreen(bottomScreenText, operandChosen);
    bottomScreen.textContent = ""; // reset bottom screen
  }
}

function populateTopScreen(bottomScreenText, operandChosen) {
  topScreen.textContent += bottomScreenText + operandChosen; // give top screen text that was in bottom screen
  console.log("this is array so far " + arrayOfInputs);
}

function getFinalResult() {
  if (arrayOfInputs.length == 1) {
    let result = arrayOfInputs[0]; // if only one element in array before equals pressed, then first element is answer bc crunchNumbers has calculated result
    bottomScreen.textContent = result;
  } else {
    let num1 = arrayOfInputs[0];
    let num2 = arrayOfInputs[1];
    let result = getAnswer(num1, num2);
    bottomScreen.textContent = result;
  }
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
