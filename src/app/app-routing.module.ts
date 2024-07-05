import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SubscribedComponent } from './components/subscribed/subscribed.component';
import { GoogleLandingPageComponent } from './components/google-landing-page/google-landing-page.component';
import { GoogleErrorComponent } from './components/google-error/google-error.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadErrorComponent } from './components/file-upload-error/file-upload-error.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';

const routes: Routes = [{
  path: 'home', component: HomepageComponent
},{
  path: 'login', component: LoginComponent
},{
  path: 'subscribed', component: SubscribedComponent
},{
  path: 'google', component: GoogleLandingPageComponent
},{
  path: 'googleerror', component: GoogleErrorComponent
},{
  path: 'fileUpload', component: FileUploadComponent
},{
  path: 'fileUploadError', component: FileUploadErrorComponent
},{
  path: 'userHomepage', component: UserHomepageComponent
},{
  path: '', component: HomepageComponent
},{
  path: '**', redirectTo: 'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
