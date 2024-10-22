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
export class AppComponent {}
