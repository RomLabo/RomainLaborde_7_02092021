import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() postTitle!: string;
  @Input() postContent!: string;
  @Input() postLike!: Number;
  @Input() postDislike!: Number;
  @Input() postUser!: string;
  @Input() postUserName!: string;
  @Input() postUserFirstName!: string;
  @Input() postId!: number;

  //@Input() postDate!: Date;

  constructor() { }

  ngOnInit(): void {
    
  }

}
