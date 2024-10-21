import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { List } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  private activeListSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  public activeList$: Observable<string | null> =
    this.activeListSubject.asObservable();

  setActiveList(listId: string | null): void {
    this.activeListSubject.next(listId);
  }

  private listsUrl = '/api/todoLists';

  getLists(): Observable<any[]> {
    return this.http.get<any[]>(this.listsUrl);
  }

  getList(id?: string | null): Observable<List | null> {
    if (id) {
      return this.http.get<List>(`${this.listsUrl}/${id}`);
    } else {
      return of(null);
    }
  }
  addList(listTitle: string): Observable<List> {
    const list: List = {
      id: new Date().getTime().toString(),
      name: listTitle,
    };
    return this.http.post<List>(this.listsUrl, list);
  }

  deleteList(listId: number) {
    return this.http.delete(`${this.listsUrl}/${listId}`);
  }
}
