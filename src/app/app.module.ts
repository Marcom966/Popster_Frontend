import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SubscribedComponent } from './components/subscribed/subscribed.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { GoogleErrorComponent } from './components/google-error/google-error.component';
import { GoogleLandingPageComponent } from './components/google-landing-page/google-landing-page.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadErrorComponent } from './components/file-upload-error/file-upload-error.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { NewDirectiveDirective } from './new-directive.directive';
import { FileSuccessfullComponent } from './components/file-successfull/file-successfull.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { AudioPlayerComponentComponent } from "./components/audio-player-component/audio-player-component.component";

@NgModule({ declarations: [
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
        FileSuccessfullComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
    NgxAudioPlayerModule,
    AppRoutingModule,
    FormsModule, OAuthModule.forRoot(), AudioPlayerComponentComponent], providers: [provideHttpClient(withInterceptorsFromDi())],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]})
export class AppModule { }
