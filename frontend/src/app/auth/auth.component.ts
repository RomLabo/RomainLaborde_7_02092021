import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }

  onLogin() {
    this.authService.login().then(() => {
      this.authStatus = this.authService.isAuth;
      this.router.navigate(['home']);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  /*onSubmit(form: NgForm) {
    const userEmail = form.value['email'];
    const userPassword = form.value['password'];
  }*/
}
