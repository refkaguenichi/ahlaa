import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/toPromise'

import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = { _id: '', username: '', password: '', role: '' };
  users: User[] = [];

  constructor() {}

  getUsers(): void {
    this.users.map((e) => e);
    console.trace('usersss', this.users)
  }

  getOneUser(id:string): void {
    this.users.find((e) => e._id === id)
  }

  addUser(user:any): void {
    let newUser = {
      ...user,
      _id: user?.username?.charAt(
        Math.floor(Math.random() * user?.username?.length)
      ),
    };
    console.info('newwwww', newUser)
    this.users.push(newUser);
    this.getUsers()
  }
}
