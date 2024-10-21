import { Component, Input, input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoService } from './services/todo.service';
import { List, Todo } from './models/todo.models';
import { ListsComponent } from './components/lists/lists.component';
import { ListService } from './services/list.service';
import { filter, of, switchMap } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TodoListComponent,
    TodoInputComponent,
    ListsComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-todo-app';

  todos: Todo[] = [];
  activeList: List | null = null;

  constructor(
    private todoService: TodoService,
    private listService: ListService
  ) {}
  ngOnInit(): void {
    this.listService.activeList$
      .pipe(
        switchMap((listId: string | null) => {
          if (listId) {
            return this.listService.getList(listId);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((list) => {
        this.activeList = list;
      });
  }

  onAddTodo(todoTitle: string) {
    this.todoService
      .addTodo(todoTitle, this.activeList!.id)
      .pipe(switchMap(() => this.todoService.getTodos(this.activeList!.id)))
      .subscribe((todos) => {
        this.todos = todos;
      });
  }
}
