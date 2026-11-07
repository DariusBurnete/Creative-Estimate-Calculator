window.AddTypeToggle = AddTypeToggle;
window.AddStage = AddStage;
window.SaveNewType = SaveNewType;
window.DeleteType = DeleteType;
window.SaveValues = SaveValues;

import { WriteNewTypeToJSON, WriteTypeValuesToJSON } from "./write.js";
import { deleteProject } from "./delete.js";
import { currentProjectName } from "./type.js";

function AddTypeToggle() {
    const addTypeDropdown = document.querySelector(".addTypeDropdown");
    if (addTypeDropdown.style.display === "none") {
        addTypeDropdown.style.display = "block";
    } else {
        addTypeDropdown.style.display = "none";
    }
}

function AddStage() {
    const newStageInputs = document.querySelector(".newStageInputs");
    const newStageInput = document.createElement("input");
    newStageInput.type = "text";
    newStageInput.placeholder = "Enter stage name";
    newStageInput.style.width = `${newStageInput.placeholder.length - 2}ch`;
    newStageInput.addEventListener("input", () => {
        const characters = newStageInput.value.length || newStageInput.placeholder.length;
        newStageInput.style.width = `${Math.max(10, characters - 2)}ch`;
    });
    newStageInputs.append(newStageInput);
}

function SaveNewType() {
    const typeName = document.getElementById("addTypeName").value;
    if (!typeName) return;
    let newType = { name: typeName, stages: [] };
    for (const stageInput of document.querySelectorAll(".newStageInputs input")) {
        if (!stageInput.value) continue;
        newType.stages.push({ name: stageInput.value, hours: 0, minutes: 0 });
    }
    if (newType.stages.length === 0) return;
    WriteNewTypeToJSON(newType)
        .then(() => window.location.reload())
        .catch((error) => {
            console.error("Error saving new type:", error);
        });
}

function DeleteType() {
    deleteProject()
        .then(() => window.location.reload())
        .catch((error) => {
            console.error("Error deleting the type", error);
        });
}

function SaveValues() {
    if (!currentProjectName) return;

    const stages = Array.from(document.querySelectorAll(".stages .stage")).map(stageElement => {
        const stageName = stageElement.querySelector("label").textContent;
        const inputs = stageElement.querySelectorAll("input");

        return {
            name: stageName,
            hours: Number(inputs[0].value),
            minutes: Number(inputs[1].value)
        };
    });

    WriteTypeValuesToJSON({
        name: currentProjectName,
        stages
    })
        .then(() => window.location.reload())
        .catch((error) => {
            console.error("Error saving type values:", error);
        });
}