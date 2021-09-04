import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  authStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }

  onSignin(form: NgForm) {
      this.authService.signin().then(() =>{
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['home']);
      });
      const User = {
        name: form.value['name'],
        fisrtName: form.value['first-name'],
        email: form.value['email'],
        password: form.value['password'],
      }
      console.log(User);
  }

}
