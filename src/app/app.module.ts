import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostListComponentComponent } from './post/post-list/post-list.component';
import { PostService } from 'src/services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { NewPostComponent } from './post/new-post/new-post.component';
import { FfxivComponent } from './ffxiv/ffxiv.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponentComponent,
    NewPostComponent,
    FfxivComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostService,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
