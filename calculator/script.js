// Get the calculator display
const display = document.getElementById("display");

// Add a number or operator to the display
function appendValue(value) {
    display.value += value;
}

// Clear the entire display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculate() {
    try {
        let expression = display.value;

        // Do nothing if the display is empty
        if (expression === "") {
            return;
        }

        // Validate allowed characters
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        // Convert percentage values to decimal values
        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        // Evaluate the arithmetic expression
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        // Check whether the result is valid
        if (typeof result !== "number" || !Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        // Display the result
        display.value = Number(result.toPrecision(12)).toString();

    } catch (error) {
        display.value = "Error";
    }
}