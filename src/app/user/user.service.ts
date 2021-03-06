import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * Usage:
   * let user1:User = new User('Peter');
    this.userService.currentUser.next(user1);

    this.userService.currentUser.subscribe((user) => {
      console.log('Current user:', user);
    });
   */
  currentUser: Subject<User> = new BehaviorSubject<User>(new User());

  public setCurrentUser(newUser: User){
    this.currentUser.next(newUser);
  }
}
