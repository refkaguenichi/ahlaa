import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';

import {User} from '../models/user.model'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users$:Subject<User> = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  private refreshUsers(){
    this.http
    .get<User[]>('/api/users')
    .subscribe((users:any)=>this.users$.next(users.users));
    // this.http
    // .get<any>('/api/users')
    // .subscribe({
    //   next: data => {
    //       console.log('repsonse ', data);
    //       return data.users
    //   },
    //   error: error => {
    //       console.error('There was an error!', error.message);
    //   }
    // });
  }

  getUsers():Subject<any>{
    this.refreshUsers()
    console.log('users', this.users$)
    return this.users$;
  }

  getOneUser(id: string): void {
    this.http
    .get<User>(`/api/users/${id}`)
    .subscribe({
      next: data => {
          console.log('repsonse ', data);
      },
      error: error => {
          console.error('There was an error!', error.message);
      }
    });
  }

  edit(data:any): any {
    this.http
      .put<User>(`/api/users/${data.id}`, data.user)
      .subscribe({
        next: data => {
            console.log('repsonse ', data);
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
      })
  }

  signup(user: any): any {
    this.http
      .post<any>('/api/users/signup', user)
      .subscribe({
        next: data => {
            console.log('repsonse ', data);
            localStorage.setItem('token', data?.accessToken);
            this.router.navigate(['/users']);
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
      })
      
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

  signin(user: any): any {
    this.http
      .post<any>('/api/users/signin', user)
      .subscribe({
        next: data => {
            console.log('repsonse ', data);
            localStorage.setItem('token', data.accessToken);
            this.router.navigate(['/users']);
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
      })
    
  }
}
