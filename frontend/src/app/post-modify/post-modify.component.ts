import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-post-modify',
  templateUrl: './post-modify.component.html',
  styleUrls: ['./post-modify.component.scss']
})
export class PostModifyComponent implements OnInit {

  @Input() errorMessage!: string;
  @Input() imagePreview!: string;

  postForm: FormGroup = new FormGroup({
    postTitle: new FormControl(''),
    postText: new FormControl('')
  });
  fileName!: string;
  dataImage!: any;
  postId!: number;
  originPost!: any;

  constructor(private postService: PostService,  private formBuilder: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();  
  }

  initForm() {
    this.postId = this.route.snapshot.params['id'];
    this.postService.getOnePost(+this.postId).subscribe((response: any) =>{
      if (response) {
        this.originPost = response;
        this.postForm = this.formBuilder.group({
          postTitle: [this.originPost.title, [Validators.minLength(3), Validators.required]],
          postText: [this.originPost.content, [Validators.required]]
        })
      }
    })
  }

  onModifyPost() {
    const inputRegExp = /'/g;
    const formValue = this.postForm.value;
    const titleForPost = inputRegExp[Symbol.replace](formValue['postTitle'], "\\'");
    const textForPost = inputRegExp[Symbol.replace](formValue['postText'], "\\'");
    this.postService.modifyPost(titleForPost, textForPost, this.dataImage, this.postId);
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
