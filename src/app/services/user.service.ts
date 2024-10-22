import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public userData$: Observable<any> = this.userDataSubject.asObservable();

  setUserData(data: any) {
    this.userDataSubject.next(data);
  }
}
