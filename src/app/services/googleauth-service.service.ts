/*import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginProvider, SocialUser } from 'angularx-social-login';
import { filter, firstValueFrom, map, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FetchUsersService } from './fetch-users.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleauthServiceService implements LoginProvider {
  requestSub = new Subscription;
  name!: string;
  surname!: string;
  eMail!: string;
  user_name!: string;
  birth!: Date;
  password!: string;

  constructor(private readonly _oAuthService: OAuthService, private fetchUsers: FetchUsersService){
    this.createConfiguration();
  }

  private readonly _TokenReceived$ = this._oAuthService.events.pipe(filter((e)=>e.type==='token_received'), map(()=>true as const));

  private createConfiguration(): void {
    const redirectUri = window.location.origin+window.location.pathname;
    console.log(redirectUri);
    
    this._oAuthService.configure({
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: redirectUri,
      silentRefreshRedirectUri: redirectUri,
      useSilentRefresh: true,
      clientId: '324448550075-625vaj9hi25eglu64o2vnldrgsijo278.apps.googleusercontent.com',
    });
  }
  async signIn(): Promise<SocialUser> {
    const tokenReceivedPromise = firstValueFrom(this._TokenReceived$);
    await this._oAuthService.initImplicitFlowInPopup();
    await tokenReceivedPromise;
    return this.createUser(this._oAuthService.getIdToken().toString());
  }

  private async createUser(idToken: string): Promise<SocialUser>{
    let clientId = this._oAuthService.clientId;
    return new SocialUser
    
  }
  
  


}*/
