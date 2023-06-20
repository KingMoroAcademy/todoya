// Select the elements
const 
    clear = document.querySelector(".clear"),
    dateElement = document.getElementById("date"),
    list = document.getElementById("list"),
    input = document.getElementById("input");

// Classes names
const CHECK = "fa-circle-check";
const UNCHECKED = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Get items from the LocalStorage
let data = localStorage.getItem("TODO");

// Check if data isn't empty
if(data) {
    // if there is data:
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to more than the last one in the list by one.
    loadList(LIST); // load the list to the user interface
} else {
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

// Show today's date
const options = {
    weekday : "long",
    month   : "short",
    day     : "numeric"
}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// <i class="fa fa-check-circle co" job="complete" id="0"></i>


// Add to do function
function addToDo(toDo, id, done, trash){
    if(trash) {return;};
    const DONE = done ? CHECK : UNCHECKED;
    const LINE = done ? LINE_THROUGH : "";
    const position = "beforeend";
    const item = `<li class="item">
    <i class="fa-regular ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa-solid fa-trash-can de" job="delete" id="${id}"></i>
    </li>`;

    list.insertAdjacentHTML(position, item);
}

// add an item to the list when the user hit the enter key
document.addEventListener("keyup", function(e) {
    if(e.keyCode == 13) {
        const toDo = input.value;

        // Check if input is empty
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id: id,
                done : false,
                trash : false
            });
            
            // Set items on the LocalStorage (This code must be added where the LIST array is updated).
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
})

// Complete task when click complete icon
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECKED);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Delete a To Do with the trash icon
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// Target Dynamically added tasks
list.addEventListener("click", function(e) {
    const element = e.target; // return the clicked element inside the list element
    const elementJob = element.attributes.job.value; // return complete or delete
    if(elementJob == "complete") {
        completeToDo(element);
    } else if(elementJob == "delete") {
        removeToDo(element);
    }
    // Set items on the LocalStorage (This code must be added where the LIST array is updated).
    localStorage.setItem("TODO", JSON.stringify(LIST));
})