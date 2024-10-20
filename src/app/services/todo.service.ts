import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = '/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(idList: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?listId=${idList}`);
  }

  addTodo(todoTitle: string, listId: number) {
    const todo = {
      id: new Date().getTime().toString(),
      title: todoTitle,
      completed: false,
      listId: listId,
    };
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  deleteCompleted(todo: Todo) {
    return this.http.delete(`${this.apiUrl}/${todo.id}`);
  }
}

//TODO Missing mark todo as done endpoint

//TODO Problemas saving items if with first list Created
