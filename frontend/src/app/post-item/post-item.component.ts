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
  @Input() imagePreview!: string;

  postForm: FormGroup = new FormGroup({
    postTitle: new FormControl(''),
    postText: new FormControl('')
  });
  fileName!: string;
  dataImage!: any;
  

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
    const inputRegExp = /'/g;
    const formValue = this.postForm.value;
    const titleForPost = inputRegExp[Symbol.replace](formValue['postTitle'], "\\'");
    const textForPost = inputRegExp[Symbol.replace](formValue['postText'], "\\'");
    this.errorMessage = this.postService.errorMessage;
    this.postService.createPost(titleForPost, textForPost, this.dataImage);
    this.router.navigate(['home']);
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.dataImage = file;
      const reader = new FileReader();
      reader.onload = () => {
          this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
