import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  userLogForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  authStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
    this.initForm();
  }

  initForm() {
    this.userLogForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.maxLength(15), Validators.minLength(8), Validators.required]]
    });
  }

  onLogin() {
    const formValue = this.userLogForm.value;
    const email = formValue['email'];
    const password = formValue['password'];

    this.authService.login(email, password).then(() => {
      this.authStatus = this.authService.isAuth;
      this.router.navigate(['home']);
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
