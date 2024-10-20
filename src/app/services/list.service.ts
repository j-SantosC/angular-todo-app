import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { List } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  //TODO fix
  private activeListSubject: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);

  public activeList$: Observable<number | null> =
    this.activeListSubject.asObservable();

  setActiveList(listId: number | null): void {
    this.activeListSubject.next(listId);
  }

  private listsUrl = '/api/todoLists';

  getLists(): Observable<any[]> {
    return this.http.get<any[]>(this.listsUrl);
  }

  getList(id: number): Observable<List> {
    return this.http.get<List>(`${this.listsUrl}/${id}`);
  }

  addList(listTitle: string) {
    const list = {
      id: new Date().getTime().toString(),
      name: listTitle,
    };
    return this.http.post(this.listsUrl, list);
  }
  deleteList(listId: number) {
    return this.http.delete(`${this.listsUrl}/${listId}`);
  }
}
