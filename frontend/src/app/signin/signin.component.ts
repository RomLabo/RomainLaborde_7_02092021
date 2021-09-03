import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const User = {
      name: form.value['name'],
      fisrtName: form.value['first-name'],
      email: form.value['email'],
      password: form.value['password'],
    }
    console.log(User);
  }

}
