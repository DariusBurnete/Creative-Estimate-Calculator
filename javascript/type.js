import { CalculateEstimatedTime, UpdateEstimatedTime, CheckInput } from "./estimated_time.js";

window.onload = fetchDefaultTypes();
window.dropdownToggle = dropdownToggle;

function dropdownToggle() {
    const dropdown = document.querySelector(".typeDropdown");
    if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function fetchDefaultTypes() {
    const dropdown = document.querySelector(".typeDropdown");
    const request = new Request("../json/default.json");
    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            for(const project of data.projects){
                const listItem = document.createElement("li");
                listItem.textContent = project.name;
                listItem.addEventListener("click", () => {
                    SelectType(project.name, project.stages);
                });
                dropdown.append(listItem);
            }
        })
}

function SelectType(typeName, typeStages) {
    const typeButton = document.querySelector(".typeButton");
    const showComplexity = document.querySelector("#showComplexity");
    typeButton.textContent = "Selected: " + typeName;
    showComplexity.textContent = '[' + ']'; // TBD
    CreateStagesItems(typeStages);
    DisplayTypeData();
}

function DisplayTypeData() {
    const showComplexity = document.querySelector(".showComplexity");
    const stagesContainer = document.querySelector(".stages");
    const estimatedTimeElement = document.querySelector(".estimatedTime");
    showComplexity.style.display = "flex";
    stagesContainer.style.display = "flex";
    estimatedTimeElement.style.display = "flex";
}

function CreateStagesItems(typeStages) {
    const stagesContainer = document.querySelector(".stages");
    DeleteChildren(stagesContainer);
    for (const stage of typeStages) {
        const stageItem = SetStageItem(stage);
        stagesContainer.append(stageItem);
    }
    CalculateEstimatedTime();
}

function DeleteChildren(stagesContainer) {
    let child = stagesContainer.lastElementChild;
    while (child.tagName !== "LABEL") {
        stagesContainer.removeChild(child);
        child = stagesContainer.lastElementChild;
    }
}

function SetStageItem(stage) {
    const stageItem = document.createElement("div");
    stageItem.className = "stage";

    const stageLabel = SetStageLabel(stage);
    const stageInput = SetStageInput(stage);
    stageItem.append(stageLabel);
    stageItem.append(stageInput);
    return stageItem;
}

function SetStageLabel(stage) {
    const stageLabel = document.createElement("label");
    stageLabel.htmlFor = stage.name;
    stageLabel.textContent = stage.name;
    return stageLabel;
}

function SetStageInput(stage) {
    const stageInput = document.createElement("div");
    stageInput.className = "stage-input";
    stageInput.append(
        CreateTimeInput(stage, "hours"),
        CreateTimeInput(stage, "minutes")
    );
    return stageInput;
}

function CreateTimeInput(stage, unit) {
    const timeInput = document.createElement("input");
    timeInput.type = "number";
    timeInput.id = stage.name + '-' + unit;
    timeInput.name = stage.name + '-' + unit;
    timeInput.required = true;
    timeInput.value = CheckInput(stage[unit], unit);

    let oldValue = timeInput.value;
    timeInput.addEventListener("input", () => {
        UpdateEstimatedTime(timeInput.value, oldValue, unit);
        oldValue = CheckInput(timeInput.value, unit);
        timeInput.value = CheckInput(timeInput.value, unit);
    });
    return timeInput;
}

