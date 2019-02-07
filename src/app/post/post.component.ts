import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  postSubscription: Subscription;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postSubscription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPostsSubject();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
