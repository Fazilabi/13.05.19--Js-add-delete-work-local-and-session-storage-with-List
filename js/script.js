// Select all elements
const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const addTodo_btn = document.querySelector(".todo-form .btn-danger");
const filterInput = document.querySelector("#filter");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group");
const clearTodo_btn = document.querySelector(".clear-todos");




eventListeners();


function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodos_toUI);
    secondCardBody.addEventListener("click", deleteTodo)
    filterInput.addEventListener("keyup", filterTodos);
    clearTodo_btn.addEventListener("click", clearAllTodos);

}

function clearAllTodos(e) {
    if (confirm("hamisi silinsin?")) {
        //Todolar frontdan silinsin
        //todo.innerHTML=""; Bu variant boyuk proyeklerde yavas iwleyir

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }

        //Todolari localstorage-den silmek
        localStorage.removeItem("todos");
    }



}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            //tapilmadisa
            listItem.setAttribute("style", "display:none !important")
        } else {
            listItem.setAttribute("style", "display: block");
        }
    });

}


function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodo_fromStorage(e.target.parentElement.parentElement.textContent);
        // showAlert("success", "listi sildiniz");
    }

}


function deleteTodo_fromStorage(deleteTodos) {
    let todoss = getTodos_fromStorage();
    todoss.forEach(function (todoo, index) {
        if (todoo == deleteTodos) {
            todoss.splice(index, 1); //Array-dan bir deyeri silmek;
        }

    });
    localStorage.setItem("todos", JSON.stringify(todoss));
}


function loadAllTodos_toUI() {
    let todos = getTodos_fromStorage();
    todos.forEach(function (todo) {
        addTodo_toUI(todo);
    })
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    const listItems = document.querySelectorAll(".list-group-item");
    let control;
    let text;


    if (newTodo === "") {
        showAlert("danger", "Bir todo daxil edin...");
    } else {
        //Todo Listden Todo degerlerinin alinmasi
        listItems.forEach(function (listItem) {
            text = listItem.textContent;
            if (newTodo == text) {
                control = true;
            }
        })
        if (control != true) {
            addTodo_toUI(newTodo);
            addTodo_toStorage(newTodo);
            showAlert("success", "Todo daxil olundu...")
        } else {
            // deger listde varsa bu ise duwur
            showAlert("danger", "girdiyiniz Todo listde var...")

        }
    }


    e.preventDefault();
}

function getTodos_fromStorage() { // Storage-dan Todo-lari elde etmek
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodo_toStorage(newTodo) {
    let todos = getTodos_fromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));


}


function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = (`alert alert-${type} mt-3`);
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    // setTimeOut elave etmek
    setTimeout(() => {
        alert.remove();
    }, 2000);



}

function addTodo_toUI(newTodo) { //String deyerini list item olaraq UI-a elave etmek;
    //List item yaratmaq
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    // Text Node elave etmek

    //Link yaratmaq
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = `<i class="fa fa-remove"></i>`; //Tilda iwaresi olanda arada bowluq qoymaq olmaz(bowluq olsa kod iwlemir.)


    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    // TodoList-e List Item-i elave etmek
    todoList.appendChild(listItem);
    todoInput.value = "";

}