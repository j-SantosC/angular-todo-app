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

  onListClick(id: string) {
    this.listService.setActiveList(id);
  }

  onAddList(listName: string) {
    this.listService.addList(listName).subscribe((list) => {
      if (list && list.id) {
        this.listService.setActiveList(list?.id);
        this.refreshLists();
      } else {
        console.log('list id not avaliable');
      }
    });
  }

  onDelete(list: any) {
    this.listService
      .deleteList(list.id)
      .pipe(switchMap(() => this.listService.getLists()))
      .subscribe((lists: any) => {
        this.lists = lists;
        this.listService.setActiveList(null);
      });
  }
}
