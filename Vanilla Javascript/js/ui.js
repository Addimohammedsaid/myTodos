class UI{

    addTodoToList(todo){
        const list = document.getElementById('todo-list');

        // Create tr element
        const row = document.createElement('li');

        row.className = "todo-item";
    
        // Insert cols
        row.innerHTML = `       
            <input type="checkbox">
            <div class="todo-item-input">
                <div class="checkbox-fake"></div>
                <p>${todo.content}</p>
                <div class="id" hidden >${todo.id}</div>
                <a class="delete"></a>
            </div>        
        `;
    
        list.appendChild(row);

        row.animate([
            // keyframes
            { transform: 'rotateX(90deg)'},
            { transform: 'rotateX(0deg)'}
            ], {
            // timing options
            duration: 400,
            fill : "forwards",
            easing : "ease",
            });

        console.log(row);
    }

    showAlert(message, className){
        // Create div
        const div = document.createElement("div");

        // Add classes
        div.className = `alert ${className}`;

        // Add Text
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector('.container');

        //
        const todolist = document.querySelector('#todo-list');

        // Insert Alert
        container.insertBefore(div, todolist);

        // // Timeout after 3s
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }

    deleteTodo(target){
        if(target.className === 'delete'){            

            target.parentElement.parentElement.animate([
                // keyframes
                { transform: 'translateX(100px) skew(0deg)'},
                { transform: 'translateX(-400px) skew(0deg)'}
                ], {
                // timing options
                duration: 350,
                fill : "forwards",
                });
        
                setTimeout(function(){ target.parentElement.remove(); }, 340); 
        }
    }

    clearFields(){
        document.getElementById('content').value = '';        
    }
}
