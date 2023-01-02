import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
  // configUrl:any = 'assets/config.json';
  // getConfig() {
  //   return this.http.get<Config>(this.configUrl);
  // }

  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.users.map((e) => e);
    console.trace('usersss', this.users);
  }

  getOneUser(id: string): void {
    this.users.find((e) => e._id === id);
  }

  addUser(user: any): void {
    console.log('userrrrrrrrrrr', user)
    // let newUser = {
    //   ...user,
    //   _id: user?.username?.charAt(
    //     Math.floor(Math.random() * user?.username?.length)
    //   ),
    // };
    // console.info('newwwww', newUser);
    // this.users.push(newUser);
    // this.getUsers();
    this.http
      .post<User>('/api/users/signup', user)
      .subscribe({
        next: data => {
            console.log('repsonse ', data);
        },
        error: error => {
            // this.errorMessage = error.message;
            console.error('There was an error!', error.message);
        }
      });
      // const headers = {
      //   Authorization: 'Bearer my-token',
      //   'My-Custom-Header': 'foobar',
      // };
      // const body = { title: 'Angular POST Request Example' };
      // this.http
      //   .post<any>('https://reqres.in/api/posts', body, { headers })
      //   .subscribe((data) => {
      //     this.postId = data.id;
      //   });
  }
}
