import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  
  @Input() postTitle!: string;
  @Input() postContent!: string;
  @Input() postLike!: Number;
  @Input() postUserName!: string;
  @Input() postUserFirstName!: string;


  commentForm: FormGroup = new FormGroup({
    commentText: new FormControl(''),
  });

  public post: any;
  comments: any[] = [];
  commentSubscription: Subscription = new Subscription;
  numberOfLike: number = 0;
  @Input() likeOf: number = 0;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.onGetOnePost();
    this.onGetPostLiker();
  }

  initForm() {
    this.commentForm = this.formBuilder.group({
      commentText: ['', [Validators.minLength(3), Validators.required]]
    })
  }

  onGetOnePost() {
    const id = this.route.snapshot.params['id'];
    this.postService.getOnePost(+id).subscribe((response: any) =>{
      if (response) {
        this.post = response;
        this.postTitle = this.post.title;
        this.postContent = this.post.content;
        this.postLike = this.post.post_like;
        this.postUserName = this.post.user_name;
        this.postUserFirstName = this.post.user_firstname;
        this.postService.getAllComments(+id);
        this.commentSubscription = this.postService.commentsSubject.subscribe(
          (comments: any[]) => {
            this.comments = comments;
          }
        )
      } else {
        this.router.navigate(['']);
      }
    })
  }

  onAddComment() {
    const id = this.route.snapshot.params['id'];
    const formValue = this.commentForm.value;
    const textForComment = formValue['commentText'];
    this.postService.createComment(+id, textForComment);
    this.postService.getAllComments(+id);
    this.commentSubscription = this.postService.commentsSubject.subscribe(
      (comments: any[]) => {
        this.comments = comments;
      }
    )
    this.commentForm.reset();
  }

  onAddLike() {
    this.numberOfLike === 1 ? this.numberOfLike-- : this.numberOfLike++;
    const likeNumber = this.numberOfLike;
    const id = this.route.snapshot.params['id'];
    this.postService.addLike(+id, likeNumber);
    this.onGetOnePost();
  }

  onAddDislike() {
    (this.numberOfLike === -1) ? this.numberOfLike++ : this.numberOfLike--;
    const likeNumber = this.numberOfLike;
    const id = this.route.snapshot.params['id'];
    this.postService.addLike(+id, likeNumber);
    this.onGetOnePost();
  }

  onGetPostLiker() {
    const id = this.route.snapshot.params['id'];
    this.postService.getPostLiker(+id).subscribe(
      (response: any) =>{
        if (response) {
          this.numberOfLike = response.user_like;
        } 
      }
    )
  }

  ngOnDestroy() {
    this.commentSubscription.unsubscribe();
  }
}
