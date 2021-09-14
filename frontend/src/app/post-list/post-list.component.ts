import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  postForm: FormGroup = new FormGroup({
    postTitle: new FormControl(''),
    postText: new FormControl('')
  });

  constructor(private postService: PostService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postService.getAllPost();
    this.postSubscription = this.postService.postsSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      postTitle: ['', [Validators.minLength(3), Validators.required]],
      postText: ['', [Validators.required]]
    })
  }

  onAddPost() {
    const formValue = this.postForm.value;
    const titleForPost = formValue['postTitle'];
    const textForPost = formValue['postText'];
    this.errorMessage = this.postService.errorMessage;
    this.postService.createPost(titleForPost, textForPost);
    this.postService.getAllPost();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
