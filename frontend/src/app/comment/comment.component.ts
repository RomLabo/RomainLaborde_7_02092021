import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() commentUserName!: string;
  @Input() commentUserFirstName!: string;
  @Input() commentContent!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
