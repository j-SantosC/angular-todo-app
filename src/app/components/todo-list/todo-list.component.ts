import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'; // Import NgFor,
import { TodoService } from '../../services/todo.service';
import { List, Todo } from '../../models/todo.models';
import { ButtonComponent } from '../button/button.component';
import { ListService } from '../../services/list.service';
import { combineLatest, filter, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [NgFor, ButtonComponent, NgIf],
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];

  activeList?: List;

  constructor(
    private todoService: TodoService,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.listService.activeList$
      .pipe(
        filter(
          (listId): listId is number => listId !== null && listId !== undefined
        ),
        switchMap((listId) =>
          combineLatest([
            this.todoService.getTodos(listId),
            this.listService.getList(listId),
          ])
        )
      )
      .subscribe(([todos, list]) => {
        this.todos = todos;
        this.activeList = list;
      });
  }

  onCheck(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteCompleted() {
    const completedTodos = this.todos.filter(
      (todo) => todo?.completed && todo?.listId === this.activeList?.id
    );
    if (completedTodos.length === 0) {
      return;
    }
    const deleteRequests = completedTodos.map((todo) =>
      this.todoService.deleteCompleted(todo)
    );
    forkJoin(deleteRequests).subscribe(() => {
      this.todoService.getTodos(this.activeList!.id).subscribe((todos) => {
        this.todos = todos;
      });
    });
  }
}
