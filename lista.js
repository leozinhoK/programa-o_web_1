const inputElement = document.querySelector(".new-task-input")
const addTaskButton = document.querySelector(".new-task-button")

const tasksContainer = document.querySelector(".tasks-container")

const validadeInput = () => inputElement.value.trim().length > 0  

 const handleAddTask = () => {
     const inputIsValid = validadeInput ();

     console.log(inputIsValid)

     if (!inputIsValid) {
        return inputElement.classList.add("error"); 
     }

     const taskItemContainer = document.createElement("div")
     taskItemContainer.classList.add("task-item")
     const taskContent = document.createElement("p")
     taskContent.innerText = inputElement.value; 
     
     taskContent.addEventListener("click", () => handleClick(taskContent))
     
     const deleteItem = document.createElement("i")
     deleteItem.classList.add("far");
     deleteItem.classList.add("fa-trash-alt");

     deleteItem.addEventListener("click", () => 
     handleDeletclick(taskItemContainer, taskContent)
     );
     

     taskItemContainer.appendChild(taskContent); 
     taskItemContainer.appendChild(deleteItem); 

     tasksContainer.appendChild(taskItemContainer);

     inputElement.value = " "; 
     UpdateLocalStorage();
 };

 const handleClick = (taskContent) => {
     const tasks = tasksContainer.childNodes;
     for (const task of tasks ) {
         const courrentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

         if (courrentTaskIsBeingClicked) {
             task.firstChild.classList.toggle("completed");
         }

     }
     UpdateLocalStorage();

 };

const handleDeletclick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;
    for (const task of tasks ) {
        const courrentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if ( courrentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    } 
    UpdateLocalStorage();

}

const handleInputChange = () =>{
    const inputIsValid = validadeInput();
    if (inputIsValid)
    return inputElement.classList.remove("error");

};

const UpdateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map (task =>{
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed")

        return {description: content.innerText, isCompleted}
    })

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks))

}

addTaskButton.addEventListener("click", () => handleAddTask()); 

inputElement.addEventListener("change", () => handleInputChange());


