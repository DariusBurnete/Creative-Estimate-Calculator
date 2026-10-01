let totalHours = 0; let totalMinutes = 0;
const estimatedTimeElement = document.querySelector("#estimatedTime");

export function CalculateEstimatedTime() {
    const stageInputs = document.querySelectorAll(".stages input");
    for (const input of stageInputs) {
        const [_, unit] = input.name.split('-');
        const value = CheckInput(input.value, unit);
        if (unit === "hours") {
            totalHours += value;
        } else if (unit === "minutes") {
            totalMinutes += value;
        }
    }

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    estimatedTimeElement.textContent = `${totalHours} hours, ${totalMinutes} minutes`;
}

export function UpdateEstimatedTime(inputValue, oldValue, unit) {
    const valueChange = CheckInput(inputValue, unit) - oldValue;
    if (unit === "hours") {
        totalHours += valueChange;
    } else if (unit === "minutes") {
        totalMinutes += valueChange;
        if (totalMinutes > 59) {
            totalHours += Math.floor(totalMinutes / 60);
            totalMinutes = totalMinutes % 60;
        } else if (totalMinutes < 0) {
            totalHours -= Math.ceil(Math.abs(totalMinutes) / 60);
            totalMinutes = (totalMinutes % 60 + 60) % 60;
        }
    }
    estimatedTimeElement.textContent = `${totalHours} hours, ${totalMinutes} minutes`;
}

export function CheckInput(value, unit) {
    value = parseInt(value);
    if (value < 0 || isNaN(value)) return 0;
    if (unit === "minutes" && value > 59) return 59;
    if (unit === "hours" && value > 999) return 999;
    return value;
}