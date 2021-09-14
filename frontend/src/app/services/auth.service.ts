import { User } from "../models/User.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()


export class AuthService {


    constructor(private http: HttpClient, private router: Router) {}

    isAuth = false;

    login(email: string, password: string) {
        this.isAuth = true;
        return this.http.post(
            'http://localhost:3000/api/auth/login',
            { email: email, password: password })
        ;
        
    }

    signin(user: User) {
        return this.http.post(
            'http://localhost:3000/api/auth/signin',
            { user: user })
        ;    
    }

    logout() {
        this.router.navigate(['']);
        localStorage.removeItem('token');
    }
}