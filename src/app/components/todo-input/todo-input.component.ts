import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { ButtonComponent } from '../button/button.component';
import { ListService } from '../../services/list.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
  standalone: true,
  imports: [FormsModule, ButtonComponent],
})
export class TodoInputComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private listService: ListService
  ) {}

  ngOnInit() {}

  inputValue!: string;
  @Output() itemAdded = new EventEmitter();

  onClick() {
    this.itemAdded.emit(this.inputValue);
    this.inputValue = '';
  }
}
