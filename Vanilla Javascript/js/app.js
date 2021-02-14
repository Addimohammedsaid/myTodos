
// Dook load Event
document.addEventListener('DOMcontentLoaded', Todos.displayTodos());

// Event Listeners for add Todo
document.getElementById('todo-form').addEventListener("submit", 
function(e){ 

    // Get form values
    const content = document.getElementById('content').value,           

    todo = new Todo(content, false);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(content === ''){
        
        // Error alert
        ui.showAlert('⚠️OOps! Please fill in all fields', 'error');        

    } else {
         // Add todo to list
        ui.addTodoToList(todo);

        // add todo 
        Todos.addTodo(todo);

        // // Clear fields
        ui.clearFields();

        // //  // Error alert
        //  ui.showAlert('todo Added!', 'success');        
    }

    e.preventDefault();
});

// Event Listeners for delete
document.getElementById('todo-list').addEventListener("click", 
function(e){ 

    const ui = new UI();

    ui.deleteTodo(e.target);

    Todos.removeTodo(e.target.previousElementSibling.textContent);

    // ui.showAlert("Todo removed", "success");

    e.preventDefault();
});


// function removeError() {    
//     document.querySelector('.alert').remove();
// }


document.querySelector("#menu").addEventListener('click', function (){    
    const categories = document.getElementById("categories");

    if(categories.style.display === "none"){
        categories.style.display = "block"
    }else categories.style.display = "none"
});