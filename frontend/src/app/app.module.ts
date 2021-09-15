import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';

import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { PostService } from './services/post.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { PostItemComponent } from './post-item/post-item.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';


const appRoutes : Routes = [
  { path: '', component: AuthComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'post-item', canActivate: [AuthGuard], component: PostItemComponent},
  { path: 'home/:id', canActivate: [AuthGuard], component: PostComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
] 

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SigninComponent,
    HomeComponent,
    NotFoundComponent,
    PostListComponent,
    PostListItemComponent,
    PostItemComponent,
    PostComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    PostService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
