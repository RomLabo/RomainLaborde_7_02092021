import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PostService } from '../services/post.service';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  @Input() errorMessage!: string;

  public readonly posts$: Observable<any[]>;


  constructor(private postService: PostService,  private formBuilder: FormBuilder, private router: Router) { 
    this.postService.getAllPost();
    this.posts$ = this.postService.postsSubject;
  }  

  
  getCreatePostPage() {
    this.router.navigate(['post-item']);
  }
}
