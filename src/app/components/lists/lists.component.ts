import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { TodoInputComponent } from '../todo-input/todo-input.component';
import { switchMap } from 'rxjs';
import { ListService } from '../../services/list.service';
import { List } from '../../models/todo.models';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [NgFor, ButtonComponent, TodoInputComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent implements OnInit {
  lists: any[] = [];
  activeList!: number;

  @Output() listClicked = new EventEmitter();

  constructor(
    private todoService: TodoService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.refreshLists();
  }

  refreshLists() {
    this.listService.getLists().subscribe((lists: any) => (this.lists = lists));
  }

  onListClick(id: number) {
    this.listService.setActiveList(id);
  }

  onAddList(listName: string) {
    this.listService.addList(listName).subscribe(() => this.refreshLists());
  }

  onDelete(list: any) {
    this.listService
      .deleteList(list.id)
      .pipe(switchMap(() => this.listService.getLists()))
      .subscribe((lists: any) => (this.lists = lists));
  }
}
