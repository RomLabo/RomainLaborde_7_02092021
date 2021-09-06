import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  namePattern = "[a-zA-Z ]*";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    firstName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  authStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(25), Validators.minLength(3), Validators.required, Validators.pattern(this.namePattern)]],
      firstName: ['', [Validators.maxLength(25), Validators.minLength(3), Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.maxLength(15), Validators.minLength(8), Validators.required]]
    });
  }

  onSignin() {
      const formValue = this.userForm.value;
      const newUser = new User(
        formValue['name'],
        formValue['firstName'],
        formValue['email'],
        formValue['password']
      );
      this.authService.signin(newUser).then(() =>{
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['home']);
      });
  }

}
