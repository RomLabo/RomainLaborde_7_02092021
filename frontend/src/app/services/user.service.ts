import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class UserService {

    public errorMessage!: string;

    constructor(private http: HttpClient, private router: Router) {}

    getProfile() {
      return this.http.get<Object>(
          'http://localhost:3000/api/profile')
      ;  
    }

    deleteProfile() {
      this.http.delete('http://localhost:3000/api/profile')
      .subscribe(
        (response) => {
          this.router.navigate(['']);
          localStorage.removeItem('token');
        },
        (error) => {this.errorMessage = error.message;}
      );
    }
    
}