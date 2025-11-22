const API_URL = "http://localhost:5000/todos";

const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");

// Load todos when page opens
window.onload = loadTodos;

function loadTodos() {
    fetch(API_URL)
        .then(res => res.json())
        .then(todos => {
            todoList.innerHTML = "";
            todos.forEach(todo => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${todo.title} 
                    <button onclick="deleteTodo(${todo.id})">Delete</button>
                `;
                todoList.appendChild(li);
            });
        });
}

function addTodo() {
    const title = todoInput.value;
    if (!title) return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    })
        .then(() => {
            todoInput.value = "";
            loadTodos();
        });
}

function deleteTodo(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadTodos());
}
