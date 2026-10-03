import { totalHours, totalMinutes } from "./estimated_time.js";

export let totalTimeInHours = 0;
let hourlyRateValue = 0; 
const kWh = 0.69;

export function SetHourlyRate(value) {
    const hourlyRate = document.querySelector("#hourlyRate");
    hourlyRate.value = CheckValue(value);
    hourlyRateValue = hourlyRate.value;
    hourlyRate.addEventListener("input", () => {
        hourlyRate.value = CheckValue(hourlyRate.value);
        hourlyRateValue = hourlyRate.value;
        CalculateEstimatedCost();
    });
}

function CheckValue(value) {
    value = parseInt(value);
    if (value < 0 || isNaN(value)) return 0;
    if (value > 999) return 999;
    return value;
}

export function CalculateEstimatedCost() {
    const estimatedCostElement = document.querySelector("#estimatedCost");
    totalTimeInHours = totalHours + totalMinutes / 60
    const estimatedCost = totalTimeInHours * hourlyRateValue + kWh * totalTimeInHours;
    estimatedCostElement.textContent = `${estimatedCost.toFixed(2)} $`;
}