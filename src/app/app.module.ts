import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SubscribedComponent } from './components/subscribed/subscribed.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { GoogleErrorComponent } from './components/google-error/google-error.component';
import { GoogleLandingPageComponent } from './components/google-landing-page/google-landing-page.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadErrorComponent } from './components/file-upload-error/file-upload-error.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { NewDirectiveDirective } from './new-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SubscribedComponent,
    CardComponent,
    FooterComponent,
    GoogleErrorComponent,
    GoogleLandingPageComponent,
    FileUploadComponent,
    FileUploadErrorComponent,
    UserHomepageComponent,
    NewDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
