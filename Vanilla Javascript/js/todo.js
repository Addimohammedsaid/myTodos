class Todo{   
    constructor(content, state, id){
        this.content = content;
        this.state = state;       
        this.id = id; 
    }
}


class Todos {

    static getTodos(){
        let todos;

        if(localStorage.getItem('todos') === null){
             todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem('todos'));
        } 

        return todos;
    }

    static displayTodos(){
        const todos = Todos.getTodos();

        todos.forEach(function(todo){
            const ui = new UI;

            // Add Todo to UI
            ui.addTodoToList(todo);
        });
    }

    static addTodo(todo){
        const todos = Todos.getTodos();

        let i  = 0;

        todos.forEach(function(todo){
            if(i < todo['id']){
                i = todo['id'];
            }               
        });

        todo.id = i+1;

        todos.push(todo);                

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodo(id){      
        
        console.log(id);

        const todos = Todos.getTodos();

        todos.forEach(function(todo, index){                        
            if(todo.id == id) {                
                todos.splice(index, 1);            
            }
        });

        localStorage.setItem('todos', JSON.stringify(todos));
        
    }
}
