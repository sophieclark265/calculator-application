function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function minus(num1, num2) {
  return num1 - num2;
}

function operate(operator, num1, num2) {
  let resultOfOfOperator = operator(num1, num2);
  return resultOfOfOperator;
}

let buttons = document.querySelectorAll("td");

buttons.forEach((button) => {
  button.addEventListener("click", display);
});

function display(input) {
  alert("user clicked " + e);
}
