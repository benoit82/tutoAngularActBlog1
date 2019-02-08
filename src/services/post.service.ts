import { Injectable, OnInit } from '@angular/core';
import { Post } from 'src/models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService implements OnInit {

  posts: Post[] = [];

  postsSubject = new Subject<any[]>();

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  addPost(newPost: Post) {
    this.posts.push(newPost);
    this.emitPostsSubject();
    this.savePostsToServer();
  }

  savePostsToServer() {
    this.httpClient.put('https://act-blog-2.firebaseio.com/posts.json', this.posts)
      .subscribe(
        () => {},
        (error) => {
          alert('sauvegarde des posts échoué : ' + error);
        }
      );
  }

  getPosts() {
    this.httpClient.get<any[]>('https://act-blog-2.firebaseio.com/posts.json').subscribe(
      (data) => {
        this.posts = [];
        data.forEach(post => {
          this.posts.push(
            new Post(post.title, post.content, post.createdAt, post.lovesIt)
          );
        });
        this.emitPostsSubject();
      },
      (error) => {
        alert('erreur de chargement de donnée : ' + error);
      }
    );
  }

  emitPostsSubject() {
    this.postsSubject.next(this.posts.slice());
  }
}
