import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable()
export class PostService {

    public errorMessage!: string;

    postsSubject = new Subject<any[]>();
    postSubject = new Subject<any>();

    private posts: any[] = [];
    public post: any;

    constructor(private http: HttpClient) {}

    emitPostsSubject() {
      this.postsSubject.next(this.posts.slice());
    }

    emitPostSubject() {
      this.postSubject.next(this.post.slice());
    }

    getAllPost() {
      this.http.get<any[]>(
        'http://localhost:3000/api/post')
      .subscribe(
        (response) => {
          this.posts = response;
          this.emitPostsSubject();
        },
        (error) => {this.errorMessage = error.message;}
      );
    }

    createPost(postTitle: string, postText: string) {
      this.http.post('http://localhost:3000/api/post',
                      {postTitle: postTitle, postText: postText})
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {this.errorMessage = error.message;}
      );
    }

    getOnePost(id: number) {
      this.http.get(
        'http://localhost:3000/api/post/:id' + id)
      .subscribe(
        (response) => {
          this.post = response;
          this.emitPostSubject();
        },
        (error) => {this.errorMessage = error.message;}
      );
    }
    
}

