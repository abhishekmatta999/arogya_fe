import { Inject, Injectable } from '@angular/core';

declare const google:any;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private accessToken: string = '';

  constructor(
    @Inject('GOOGLE_CLIENT_ID') public clientId: string
  ) {}

  // Method to trigger Google OAuth login
  loginWithGoogle(callback: (profileData: any, tokenData: any) => void): void {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: 'https://www.googleapis.com/auth/fitness.activity.read '+'https://www.googleapis.com/auth/fitness.heart_rate.read '+'https://www.googleapis.com/auth/fitness.location.read',
      callback: (tokenResponse: any) => {
        this.accessToken = tokenResponse.access_token;
        this.getUserProfile(callback);
      },
    });
    tokenClient.requestAccessToken();
  }

  private getUserProfile(callback: (profileData: any, tokenData: any) => void): void {
    if (!this.accessToken) {
      console.error('Access token is not available.');
      return;
    }
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(response => response.json())
      .then(profileData => {
        callback(profileData, {
          accessToken: this.accessToken,
        });
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }


}
