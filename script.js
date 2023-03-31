const url = "https://jsonplaceholder.typicode.com/todos";

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
document.querySelector('#todo-form').addEventListener('submit',createTodo);
document.querySelector('#todo-list').addEventListener('click',toggleCompleted);
document.querySelector('#todo-list').addEventListener('dblclick',deleteTodo);


function getTodos() {
    fetch(url + '?_limit=5')
        .then(res => res.json())
        .then(data => {
            data.forEach(todo => addTodoToDOM(todo));
        });
};

function createTodo(e) {
    e.preventDefault();
    //create a new Todo object
    const newTodo = {
        title: e.target.firstElementChild.value, 
        completed: false,
    }
    fetch(url,{
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-type' :  'application/json'
        }
    })
    .then(res => res.json())
    .then(data => addTodoToDOM(data));
};

//update the particular todo on basis of completed or not changing color to gray.
function updateTodo(id, completed) {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({completed}),
        headers: {
            'Content-type' :  'application/json'
        },
    })
};

//can delete the todos once they are marked as completed.
function deleteTodo(e) {
    if(e.target.classList.contains('todo')) {
        const id = e.target.dataset.id;
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then( () => e.target.remove());
    }
};

function addTodoToDOM(todo) {
    const div = document.createElement('div');
    div.classList.add('todo');
    div.appendChild(document.createTextNode(todo.title));
    //give custom attribute to each todo
    div.setAttribute('data-id', todo.id);
    if(todo.completed) {
            div.classList.add('done');
    }
    document.querySelector('#todo-list').appendChild(div);
};

function toggleCompleted(e) {
    if(e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
        updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
}