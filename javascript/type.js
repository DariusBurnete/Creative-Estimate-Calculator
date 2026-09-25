window.onload = fetchDefaultTypes();

function dropdownToggle() {
    const dropdown = document.querySelector('.typeDropdown');
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

function fetchDefaultTypes(){
    const dropdown = document.querySelector('.typeDropdown');
    const request = new Request("../json/default.json");
    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            for(const project of data.projects){
                const listItem = document.createElement('li');
                listItem.textContent = project.name;
                listItem.addEventListener('click', () => {
                    selectType(project.name);
                });
                dropdown.appendChild(listItem);
            }
        })
}

function selectType(typeName){
    const button = document.querySelector(".typeButton");
    button.textContent = "Selected: " + typeName;
}

