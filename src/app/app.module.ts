import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostListComponentComponent } from './post/post-list/post-list.component';
import { PostService } from 'src/services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { NewPostComponent } from './post/new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponentComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
