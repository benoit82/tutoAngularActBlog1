import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required ],
      content: ['', Validators.required ]
    });
  }

  onSubmitForm() {
    // récuperation de l'id max pour le nouveau post
    const idMax = this.postService.posts.length;
    const formValues = this.postForm.value;
    const newPost = new Post(idMax, formValues['title'], formValues['content'], new Date(), 0);
    this.postService.addPost(newPost);
    this.router.navigate(['posts']);
  }

}
