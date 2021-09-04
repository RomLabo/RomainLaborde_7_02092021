import { User } from "../models/User.model";
import { Subject } from "rxjs";


export class UserService {

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
        this.users.push(user);
        this.emitUsers();
    }
}