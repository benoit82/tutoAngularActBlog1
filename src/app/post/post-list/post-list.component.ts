import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/models/post.model';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponentComponent implements OnInit {

  @Input() post: Post;
  @Input() index: number;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() { }

  addLike(add: number) {
    this.postService.addLike(this.index, add);
  }

  deletePost() {
    this.postService.deletePost(this.index);
  }
}
