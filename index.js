// Find Submit button for listening click events
const submitButton = document.getElementById("submit-todo");
// Find todo input field for getting the new todo
const newTodoInput = document.getElementById("new-todo");

// There are 2 main function at localStorage :
// 1. localStorage.getItem( key ) accepts string and returns value of given key
// 2. localStorage.setItem(key,value) accepts a key and value for storing that value to given key

// Function for adding new todo htmls into ul element on the page

const updateDOM = () => {
  const localParsedArray = localStorage.getItem("TodoList")
    ? JSON.parse(localStorage.getItem("TodoList"))
    : [];

  const todoList = document.getElementById("todo-list");

  todoList.innerHTML = null;

  localParsedArray.forEach((item) => {
    const listElement = document.createElement("li");
    listElement.setAttribute("class", "todo-wrapper");

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("value", item);

    const checkBoxElement = document.createElement("input");
    checkBoxElement.setAttribute("type", "checkbox");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-todo");

    deleteButton.innerHTML = "Delete";

    listElement.appendChild(inputElement);

    listElement.appendChild(checkBoxElement);
    listElement.appendChild(deleteButton);

    todoList.appendChild(listElement);
  });

  // DO some action when checkbox is clicked
  const checkBoxItems = document.querySelectorAll("input[type=checkbox]");

  checkBoxItems.forEach((checkbox) => {
    checkbox.addEventListener(
      "click",
      (event) =>
        (event.target.previousElementSibling.style.border = "2px solid green")
    );
  });

  // DO some action when delete is clicked
  const deleteButtons = document.querySelectorAll(".delete-todo");

  //
  deleteButtons.forEach((deleteBtn) => {
    // Remove deleted ıtem from the todo list
    deleteBtn.addEventListener("click", (event) =>
      todoList.removeChild(event.target.parentElement)
    );
  });

  // Clear input value after adding todo to array

  newTodoInput.value = "";
};

// Function for listening click events on the submit new todo button

submitButton.addEventListener("click", () => {
  // Because  values on the localstorage are stored as strings :
  // We need to use JSON.parse to convert the string value into its original format.

  // Value of currentTodo
  const newTodo = newTodoInput.value;
  const localParsedArray = localStorage.getItem("TodoList")
    ? JSON.parse(localStorage.getItem("TodoList"))
    : [];

  const updatedTodos = [...localParsedArray, newTodo];

  localStorage.setItem("TodoList", JSON.stringify(updatedTodos));

  updateDOM();
});

updateDOM();
