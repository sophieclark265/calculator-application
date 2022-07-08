let digits = document.querySelectorAll(".digits");

let responsiveDigits = digits.forEach((digit) => {
  digit.addEventListener("click", populateBottomScreen);
});

let holdAnswer = 0;

let bottomScreen = document.querySelector(".bottom-screen"); // grab bigScreen HTML dom
let topScreen = document.querySelector(".top-screen");
let operandChosen;
let firstInput = topScreen.textContent;
let secondInput = bottomScreen.textContent;

let equals = document.querySelector(".digits-equal");
let decimal = document.querySelector("#decimal");
decimal.addEventListener("click", onClickDecimal);

equals.addEventListener("click", getAnswer);

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

function populateBottomScreen(event) {
  // fill out bottom screen
  let digitChosen = event.target.innerText; // gets number or operand chosen
  if (
    digitChosen == "*" ||
    digitChosen == "/" ||
    digitChosen == "-" ||
    digitChosen == "+" ||
    digitChosen == "C"
  ) {
    clearBottomScreen(digitChosen); // clear bottom screen
  } else {
    bottomScreen.textContent += digitChosen; // populate bottom screen with digit chosen
    arrayOfInputs.push(digitChosen);
    console.log("first function array of Inputs state " + arrayOfInputs);
    if (arrayOfInputs[0] && arrayOfInputs[1]) {
      let num1 = arrayOfInputs[0];
      let num2 = arrayOfInputs[1];
      executePair(num1, num2);
    }
  }
}

function executePair(num1, num2) {
  console.log("running execute pair func");
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

  let numberAnswer = Number(answer);

  holdAnswer = numberAnswer;

  if (isFinite(holdAnswer)) {
    // only if finite number
    topScreen.textContent = holdAnswer;
    bottomScreen.textContent = "";
    arrayOfInputs = []; // 1 + 1 is 2, delete array and push 2
    operandChosen = 0; // then if i add 1 again, i need to get 3
    arrayOfInputs.push(holdAnswer);
  } else {
    // if holdAnswer is infinite, call error func
    topScreen.textContent = "";
    arrayOfInputs.splice(-1, 1);
    console.log("just spliced array of Inputs " + arrayOfInputs);
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
    // fill out top screen, then reset bottom screen
    let bottomScreenText = bottomScreen.textContent;
    populateTopScreen(bottomScreenText, operandChosen);
    bottomScreen.textContent = ""; // reset bottom screen
  }
}

function populateTopScreen(bottomScreenText, operandChosen) {
  topScreen.textContent = bottomScreenText + operandChosen; // give top screen text that was in bottom screen
  console.log("this is array so far " + arrayOfInputs);
}

// function operandDecider(num1, num2, operand) {
//   console.log("operand decider func has been called");
// }
// event object
// target attribute or field

function getAnswer() {
  // operand top number by bottom number
  let answer;
  let num2 = bottomScreen.textContent;
  let num1 = topScreen.textContent;
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
  topScreen.textContent = "";
  bottomScreen.textContent = "";
  bottomScreen.textContent = answer;
}

function onClickDecimal(event) {
  let str = bottomScreen.textContent;
  if (str[str.length - 1] == ".") {
    return;
  }
  bottomScreen.textContent += ".";
}

function errorMessage() {
  console.log("running error message function");
  return (bottomScreen.textContent = "Oops! Can't divide by 0.");
}

let arraySpliced = false;

// as soon as two inputs with one operand, need to do calculation and store result
//
