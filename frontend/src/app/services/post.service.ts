import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable()
export class PostService {

    postsSubject = new Subject<any[]>();

    private posts: any[] = [];

    constructor(private http: HttpClient) {}

    emitPostsSubject() {
      this.postsSubject.next(this.posts.slice());
    }

    getAllPost() {
      this.http.get<any[]>(
        'http://localhost:3000/api/auth/home')
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPostsSubject();
          console.log(this.posts);
        },
        (error) => {console.log(error);}
    );
    }
    
}