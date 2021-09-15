import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../services/post.service';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() errorMessage!: string;

  posts: any[] = [];
  postSubscription: Subscription = new Subscription;


  constructor(private postService: PostService,  private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.postService.getAllPost();
    this.postSubscription = this.postService.postsSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );
  }

  getCreatePostPage() {
    this.router.navigate(['post-item']);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
