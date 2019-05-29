import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { FfxivComponent } from './ffxiv/ffxiv.component';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: 'posts', component: PostComponent },
  { path: 'posts/new', component: NewPostComponent },
  { path: 'ffxiv', component: FfxivComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
