import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService implements OnInit, OnDestroy {

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

  addLike(index: number, add: number) {
    this.posts[index].lovesIt += add;
    this.emitPostsSubject();
    this.savePostsToServer();
  }

  savePostsToServer() {
    this.httpClient.put('https://act-blog-2.firebaseio.com/posts.json', this.posts)
      .subscribe(
        () => { },
        (error) => {
          alert('sauvegarde des posts échoué : ' + error);
        }
      );
  }

  getPosts() {
    this.httpClient.get<any[]>('https://act-blog-2.firebaseio.com/posts.json').subscribe(
      (data) => {
        this.posts = [];
        if (data && data.length > 0) {
        data.forEach(post => {
          this.posts.push(
            new Post(post.title, post.content, post.createdAt, post.lovesIt)
          );
        });
        }
        this.emitPostsSubject();
      },
      (error) => {
        alert('erreur de chargement de donnée : ' + error);
      }
    );
  }

  deletePost(index: number) {
    this.posts.splice(index, 1);
    this.emitPostsSubject();
    this.savePostsToServer();
  }

  emitPostsSubject() {
    this.postsSubject.next(this.posts.slice());
  }

  ngOnDestroy() {
    this.postsSubject.unsubscribe();
  }
}
