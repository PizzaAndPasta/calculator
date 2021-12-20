let inputScreen = document.querySelector(".inputFromUser");              //Screen eingegebene Zahlen
let resultScreen = document.querySelector(".result");             // Ausgabefeld Ergebis
let currentNumber = "";
let screenReset = false; 


let firstOperand = "";
let secondOperand = "";
let currentOperation = "";

//clear button
let clearbutton = document.getElementById("CLEAR");
clearbutton.addEventListener("click", appendClear);
function appendClear(e) {
    currentNumber = "";
    firstOperand = "";
    secondOperand = "";
    inputScreen.textContent = "";
    resultScreen.textContent = "";
}

//delete last button
let deletebutton = document.getElementById("DELETE");
deletebutton.addEventListener("click", deleteLast);
function deleteLast() {
    if (resultScreen != "") {
        resultScreen.textContent = "";
    }
    let newCurrentNumber = currentNumber.slice(0, -1);
    currentNumber = newCurrentNumber;
    screenReset = true;
    let newInputScreen = inputScreen.textContent.slice(0, -1);
    appendInputScreen(newInputScreen);
    screenReset = false;
}


//Funktion zum darstellen der currentNumber auf dem Screen
//solange screeenReset == false ist, wird der neue String nur drangehangen.
function appendInputScreen(e) {
    if (screenReset === false) {
        inputScreen.textContent += e;
    }
    else {
        inputScreen.textContent = e;
    }
}
//Funktion zum Darstellen des Ergebnisses auf dem Resultscreen
function displayResultScreen(e){
    resultScreen.textContent = e;
}



//Variable mit allen Operatoren sowie die Funktion um currentOperand auf den gedrückten Operator zu wechseln
let operatorButtons = document.querySelectorAll(".operatorButtons");
operatorButtons.forEach(e => {
    e.addEventListener("click", operatorPressed);
});

function operatorPressed(e) {
    //currentOperation wird auf den gedrückten Operator gesetzt.
    
    if (currentOperation != "=" && firstOperand === "") {
        currentOperation = currentOperation = e.target.textContent.toString();
        firstOperand = currentNumber;
        appendInputScreen(" " + currentOperation + " ");
        currentNumber = "";
    }
    else if (firstOperand != "" && e.target.textContent.toString() != "=" && currentNumber != ""){
        secondOperand = currentNumber;
        let zwischenergebnis = operate(parseFloat(firstOperand), parseFloat(secondOperand), currentOperation);
        let zwischenergebnisString = zwischenergebnis.toString();

        currentOperation = currentOperation = e.target.textContent.toString();
        zwischenergebnisString += " " + currentOperation;
        screenReset = true;
        appendInputScreen(zwischenergebnisString);
        screenReset = false;

        firstOperand = zwischenergebnis;
        secondOperand = "";
        currentNumber = ""; 
        console.log("!=");
    }
    else if (e.target.textContent.toString() === "=") {
       secondOperand = currentNumber;
       let ergebnis = operate(parseFloat(firstOperand), parseFloat(secondOperand), currentOperation);
       displayResultScreen(ergebnis);
       console.log("=");
    }  

   
   

}


//Variable mit allen Zahlenbuttons
let numberButtons = document.querySelectorAll(".numberButtons");
//console.log(numberButtons);

numberButtons.forEach(e => {
    e.addEventListener("click", addNumber)
    //console.log(e);
});

//Funktion, welche die gedrückte Zahl zu currentNumber hinzufügt
function addNumber(e) {
    if(currentNumber.length >= 20) {
        //Max Länge von currentNumber ist 20 Zeichen
        return;
    }
    else {
        // die currentNumber bekommt die neu gedrückte Nummer angehängt:
        let newNum = e.target.textContent.toString()
        currentNumber = currentNumber + newNum;
        appendInputScreen(newNum);
        checkVar();
    }
}


let dotButton = document.getElementById(".");
dotButton.addEventListener("click", appendDot);

function appendDot(e) {
    if (currentNumber.includes(".")) {
        return;
    }
    else {
    let dot = e.target.textContent.toString();
    currentNumber = currentNumber + dot;
    appendInputScreen(dot);
    checkVar();
    }
}

//Funktion operate zum richtigen Aufrufen der Rechnugsfunktionen
function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "*":
            return multiply(num1,num2);
            break;
        default:
            return divide(num1,num2);
            break;            
    }
}




//Funktionen für die eigentliche Rechnung
function add(num1, num2) {
    return sum = num1 + num2;
}
function subtract(num1, num2) {
    return div = num1 - num2;
}
function multiply(num1,num2) {
    return prod = num1 * num2;
}
function divide(num1, num2) {
    return quot = num1 / num2;
}



   function checkVar() {
   console.log("firstOperand " + firstOperand);
   console.log("seocondOperand : " + secondOperand);
   console.log("Operator " + currentOperation);
   console.log("currentNumber " + currentNumber);
   } 