window.onload = fetchDefaultTypes();

function dropdownToggle() {
    const dropdown = document.querySelector('.typeDropdown');
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

function fetchDefaultTypes() {
    const dropdown = document.querySelector('.typeDropdown');
    const request = new Request("../json/default.json");
    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            for(const project of data.projects){
                const listItem = document.createElement('li');
                listItem.textContent = project.name;
                listItem.addEventListener('click', () => {
                    selectType(project.name, project.complexity, project.stages);
                });
                dropdown.appendChild(listItem);
            }
        })
}

function selectType(typeName, typeComplexity, typeStages) {
    const typeButton = document.querySelector(".typeButton");
    const showComplexity = document.querySelector("#showComplexity");
    typeButton.textContent = "Selected: " + typeName;
    showComplexity.textContent = "[" + typeComplexity + "]"; // TBD
    CreateStagesItems(typeStages);
    DisplayTypeData();
}

function DisplayTypeData() {
    const showComplexity = document.querySelector(".showComplexity");
    const stagesContainer = document.querySelector(".stages");
    showComplexity.style.display = "flex";
    stagesContainer.style.display = "flex";
}

function CreateStagesItems(typeStages) {
    const stagesContainer = document.querySelector(".stages");
    DeleteChildren(stagesContainer);
    for (const stage of typeStages) {
        const stageItem = document.createElement('div');
        const stageLabel = document.createElement('label');
        const stageInput = document.createElement('input');
        SetStageElement(stage, stagesContainer, stageItem, stageLabel, stageInput);
    }
}

function SetStageElement(stage, stagesContainer, stageItem, stageLabel, stageInput) {
    stageItem.className = 'stage';
    stageLabel.htmlFor = stage.name;
    stageLabel.textContent = stage.name;
    stageInput.type = 'number';
    stageInput.id = stage.name;
    stageInput.name = stage.name;
    stageInput.min = 0;
    stageInput.max = 99;
    stageItem.appendChild(stageLabel);
    stageItem.appendChild(stageInput);
    stagesContainer.appendChild(stageItem);
}

function DeleteChildren(stagesContainer) {
    let child = stagesContainer.lastElementChild;
    while (child.tagName !== 'LABEL') {
        stagesContainer.removeChild(child);
        child = stagesContainer.lastElementChild;
    }
}

