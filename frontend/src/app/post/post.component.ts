import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  public post: any;
  postSubscription: Subscription = new Subscription;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.postService.getOnePost(params.id)
        this.postSubscription = this.postService.postSubject.subscribe(
          (post: any) => {
            this.post = post;
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
