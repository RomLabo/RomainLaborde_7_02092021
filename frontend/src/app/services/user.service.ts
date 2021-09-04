import { User } from "../models/User.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()


export class UserService {

    constructor(private http: HttpClient) {}

    userSubject = new Subject<User[]>();
    private users: User[] = [
        {
            name:'james',
            firstName: 'fofo',
            email: 'ok@ok.fr',
            password: 'abldo'
        }
    ];

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.http.post(
            'http://localhost:3000/api/signin',
            { user })
        .subscribe(
            () => {
                console.log('user enregistré');
            }, (error) => {
                console.log(error);
            }
        );
        this.users.push(user);
        this.emitUsers();
    }
}