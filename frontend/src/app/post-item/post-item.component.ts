import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() errorMessage!: string;

  postForm: FormGroup = new FormGroup({
    postTitle: new FormControl(''),
    postText: new FormControl('')
  });

  constructor(private postService: PostService,  private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
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
    this.router.navigate(['home']);
  }
}
