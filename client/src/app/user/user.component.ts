import { Component } from '@angular/core';
import { Fruit } from '../fruit';
import { FRUITS } from '../fruit-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user: User={_id:"", username:"", password:"", role:""};
  arr:String[]=['lina', 'ahmed', 'fedi', 'sarah'];
  isTemplate=true;
  image='https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
  fruits=FRUITS
  selectedFruit:Fruit=this.fruits[0]
  userForm = new FormGroup({
    _id: new FormControl(''),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      // forbiddenNameValidator(/bob/i), // <-- Here's how you pass in the custom validator.
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    role: new FormControl(''),
  });
  constructor(private userService: UserService) {}

  get name() {
    return this.userForm.get('username');
  }
  onAddUser() {
    console.warn(this.userForm.value);
    this.userService.addUser(this.userForm.value);
  }
  selectFruit(fruit:Fruit):void{
    this.selectedFruit=fruit
  }
}
