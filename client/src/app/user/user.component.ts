import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: User={_id:"", username:"", password:"", role:""};
  arr:String[]=['lina', 'ahmed', 'fedi', 'sarah'];
  isTemplate=true;
  image='https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'

  constructor(private userService: UserService){

  }
  onAddUser(){
    alert('hellllllllllo')
  }
}
