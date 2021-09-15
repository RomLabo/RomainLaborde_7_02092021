import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable()
export class PostService {

    public errorMessage!: string;

    postsSubject = new Subject<any[]>();
    commentsSubject = new Subject<any[]>();

    private posts: any[] = [];
    private comments: any[] = [];
    public post: any;

    constructor(private http: HttpClient) {}

    emitPostsSubject() {
      this.postsSubject.next(this.posts.slice());
    }

    emitCommentsSubject() {
      this.commentsSubject.next(this.comments.slice());
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
      return this.http.get(
        'http://localhost:3000/api/post/' + id)
      ;
    }

    getAllComments(id: number) {
      this.http.get<any[]>(
        'http://localhost:3000/api/post/comments/' + id)
      .subscribe(
        (response) => {
          this.comments = response;
          this.emitCommentsSubject();
        },
        (error) => {this.errorMessage = error.message;}
      );
    }

    createComment(id: number, commentText: string) {
      this.http.post('http://localhost:3000/api/post/comments/' + id,
                      {commentText: commentText})
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {this.errorMessage = error.message;}
      );
    }
    
}

/*
getOnePost(id: number) {
      this.http.get(
        'http://localhost:3000/api/post/' + id)
      .subscribe(
        (response) => {
          this.post = response;
          //this.emitPostSubject();
        },
        (error) => {this.errorMessage = error.message;}
      );
}
*/
