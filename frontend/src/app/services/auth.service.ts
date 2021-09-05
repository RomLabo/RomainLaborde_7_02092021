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
                'http://localhost:3000/api/login',
                { email: email, password: password })
            .subscribe(
                () => {
                    this.isAuth = true;
                    console.log('user connecté');
                    resolve(true);
                }, (error) => reject(error)
            );
        });
    }

    logout() {

    }

    signin(user: User) {
        return new Promise ((resolve, reject) => {
            this.http.post(
                'http://localhost:3000/api/signin',
                { user: user })
            .subscribe(
                () => {
                    this.isAuth = true;
                    console.log('user enregistré');
                    resolve(true);
                }, (error) => reject(error)
            );
            
        });
    }
}