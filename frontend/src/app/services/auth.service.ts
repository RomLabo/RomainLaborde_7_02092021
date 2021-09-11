import { User } from "../models/User.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()


export class AuthService {


    constructor(private http: HttpClient) {}

    isAuth = false;

    login(email: string, password: string) {
        return new Promise ((resolve, reject) => {
            this.http.post(
                'http://localhost:3000/api/auth/login',
                { email: email, password: password })
            .subscribe(
                (response: any) => {
                    if (response.token) {
                        localStorage.setItem('token', response.token);
                    }
                    this.isAuth = true;
                    resolve(true);
                },
                (error) => {
                reject(error);
                }
            );    
        });
    }

    logout() {

    }

    signin(user: User) {
        return new Promise ((resolve, reject) => {
            this.http.post(
                'http://localhost:3000/api/auth/signin',
                { user: user })
            .subscribe(
                () => {
                  this.login(user.email, user.password)
                    .then(() => resolve(true))
                    .catch((error) => reject(error));
                },
                (error) => reject(error)
            );    
        });
    }
}