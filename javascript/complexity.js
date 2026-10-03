import { totalTimeInHours } from "./cost.js";

export function SetComplexity() {
    const showComplexity = document.querySelector("#showComplexity");
    const minOld = 0; const maxOld = 2000; const minNew = 1; const maxNew = 9;
    const symbol = '🟐';
    const normalizedValue = (totalTimeInHours - minOld)/(maxOld - minOld) * (maxNew - minNew) + minNew;
    let symbolString = "";
    for (let i = 0; i < 9; i++) {
        if (i < normalizedValue) symbolString += symbol;
        else symbolString += ' ';
    }
    showComplexity.textContent = `[${symbolString}]`;
}