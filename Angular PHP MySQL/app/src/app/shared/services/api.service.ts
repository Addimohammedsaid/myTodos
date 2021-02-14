import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../modules/category';
import { Todos } from '../modules/todos';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  readonly rootUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  getTodos(id:number, category:number)
  {
    return this.http.get(`${this.rootUrl}/todos/getTodos.php?id=${id}&category=${category}`);
  }

  addTodo(data:Todos){
    return this.http.post(`${this.rootUrl}/todos/addTodo.php`,JSON.stringify(data));
  }

  updateTodo(data:Todos, id:number){
    return this.http.put(`${this.rootUrl}/todos/editTodo.php`,JSON.stringify(data))
  }

  deleteTodo(id:number)
  {
    console.log(id);
    return this.http.delete(`${this.rootUrl}/todos/deleteTodo.php?id=${id}`)
  }

  getCatgories(id:number)
  {
    return this.http.get(`${this.rootUrl}/todos/getCategories.php?id=${id}`);
  }

  addCategory(data:Category){
    return this.http.post(`${this.rootUrl}/todos/addCategory.php`,JSON.stringify(data))
  }

  deleteCategory(id:number)
  {
    console.log(id);
    return this.http.delete(`${this.rootUrl}/todos/deleteCategory.php?id=${id}`)
  }


}
