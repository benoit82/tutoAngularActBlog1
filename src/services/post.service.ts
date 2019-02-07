import { Injectable, OnInit } from '@angular/core';
import { Post } from 'src/models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService implements OnInit {

  posts = [];

  postsSubject = new Subject<Post[]>();

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  savePostsToServer() {
    this.httpClient.put('https://act-blog-2.firebaseio.com/posts.json', this.posts)
      .subscribe(
        () => {
          alert('sauvegarde des posts réussi !');
        },
        (error) => {
          alert('sauvegarde des posts échoué : ' + error);
        }
      );
    this.emitPostsSubject();
  }

  getPosts() {
    this.httpClient.get<any[]>('https://act-blog-2.firebaseio.com/posts.json').subscribe(
      (data) => {
        if (data.length > 0) {
          data.forEach(element => {
            const newPost = new Post(+element.get('id'),
             element.get('title'), element.get('content'), element.get('createdAt'), +element.get('lovesIt'));
            this.posts.push(newPost);
          });
        } else {
          this.posts = [];
        }
        this.emitPostsSubject();
      }
    );
  }

  emitPostsSubject() {
    this.postsSubject.next(this.posts.slice());
  }
}
