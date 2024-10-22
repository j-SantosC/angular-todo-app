import { Component, OnInit } from '@angular/core';
import { List, Todo } from '../../models/todo.models';
import { TodoService } from '../../services/todo.service';
import { switchMap, of } from 'rxjs';
import { ListService } from '../../services/list.service';
import { HeaderComponent } from '../../components/header/header.component';
import { ListsComponent } from '../../components/lists/lists.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoInputComponent } from '../../components/todo-input/todo-input.component';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    ListsComponent,
    TodoListComponent,
    TodoInputComponent,
    NgIf,
  ],
})
export class HomeComponent implements OnInit {
  title = 'angular-todo-app';

  todos: Todo[] = [];
  activeList: List | null = null;
  user: any = null;

  constructor(
    private todoService: TodoService,
    private listService: ListService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userService.userData$.subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
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
