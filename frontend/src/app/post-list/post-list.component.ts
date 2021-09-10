import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../services/post.service';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: any[] = [];
  postSubscription: Subscription = new Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPost();
    this.postSubscription = this.postService.postsSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
