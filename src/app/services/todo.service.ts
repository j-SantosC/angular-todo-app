import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = '/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(idList: string | null): Observable<Todo[]> {
    if (!idList) {
      return of([]); // Return an observable of an empty array
    }
    return this.http.get<Todo[]>(`${this.apiUrl}?listId=${idList}`);
  }

  addTodo(todoTitle: string, listId: string) {
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

  toggleCompleted(updatedTodo: Todo) {
    return this.http.patch(`http://localhost:3000/todos/${updatedTodo.id}`, {
      completed: updatedTodo.completed,
    });
  }
}
