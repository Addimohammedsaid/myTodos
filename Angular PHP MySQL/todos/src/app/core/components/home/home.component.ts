import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/shared/modules/category';
import { Todos } from 'src/app/shared/modules/todos';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoryForm = new FormGroup({
    category: new FormControl("", [Validators.required, Validators.minLength(1)]),       
  });

  todoForm = new FormGroup({
    content: new FormControl("", [Validators.required, Validators.minLength(1)]),       
  });

  user : any;
  category :any;

  categories : Category [] = [] ;
  todos : Todos [] = [];    

  constructor(private databaseService : ApiService, private authService : AuthService, private route: ActivatedRoute,) {
    this.user = this.authService.getUser();

    this.route.queryParams.subscribe(params => {
      this.category = params['category'];       
      this.loadTodos();
  });

  }

  ngOnInit(): void {        
    this.loadCategories();
  }

  loadCategories(){    
    const userId = JSON.parse(this.user);
    this.databaseService.getCatgories(userId['id']).subscribe((e : any)=>{
      this.categories = e["data"];
    })
  };

  addCategory(){    
    this.categoryForm.value["userid"] = JSON.parse(this.user)['id'];
    this.databaseService.addCategory(this.categoryForm.value).subscribe((e : any)=>{
      if(e['data']) this.categories.unshift(e['data']);      
    });
  }

  deleteCategory(){
    this.databaseService.deleteCategory(this.category).subscribe((e:any)=> {              
       console.log(e);        
    }),(error: HttpErrorResponse) =>
    {         
      console.log(error)      
    };
  }

  addTodo(){
    if(this.todoForm.valid){
      this.todoForm.value["category"] = this.category;
      this.todoForm.value["userid"] = JSON.parse(this.user)['id'];
      this.databaseService.addTodo(this.todoForm.value).subscribe((e : any)=>{
        if(e['data']) this.todos.unshift(e['data']);            
      });
    }
  }

  loadTodos(){        
    const userId = JSON.parse(this.user);
    this.databaseService.getTodos(userId['id'], this.category).subscribe((e : any)=>{      
      if(e["data"])this.todos = e["data"];
      else this.todos = [];
    });
  }

  deleteTodo(id:number, index:number){
    this.databaseService.deleteTodo(id).subscribe((e:any)=> {      
      if(e){        
        this.todos.splice(index, 1);
      }
    }),(error: HttpErrorResponse) =>
    {         
      console.log(error)      
    };
  }

  get content() {
    return this.todoForm.get('content');
  }

}
