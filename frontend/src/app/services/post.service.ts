import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "./auth.service";



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
        'http://localhost:3000/api/post')
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPostsSubject();
        },
        (error) => {console.log(error);}
      );
    }

    createPost(postTitle: string, postText: string) {
      this.http.post('http://localhost:3000/api/post',
                      {postTitle: postTitle, postText: postText})
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {console.log(error);}
      );
    }
    
}

