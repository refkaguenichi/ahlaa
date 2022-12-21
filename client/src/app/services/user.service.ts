import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/toPromise'

import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User={_id:"", username:"", password:"", role:""}
  users:User[]=[]

  constructor() { }
}
