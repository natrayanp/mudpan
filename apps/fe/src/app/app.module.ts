import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@mudpan/material';   // Added

import { NgxAuthFirebaseUIModule } from '@mudpan/ngx-auth-firebaseui';
import {  MatDialogRef } from '@angular/material/dialog';
import { MatPasswordStrengthComponent } from "@angular-material-extensions/password-strength";
import {environment} from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';


export const firebaseKey = environment.config;

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    MaterialModule,        
    // Specify the ngx-auth-firebaseui library as an import    
    NgxAuthFirebaseUIModule.forRoot(firebaseKey ,
       () => 'your_app_name_factory',
      {
        enableFirestoreSync: false, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: true,
        enableEmailVerification: true, // default: true
        useRawUserCredential: false, // If set to true outputs the UserCredential object instead of firebase.User after login and signup - Default: false
      }),
      HttpClientModule
  ],
  providers: [
    {
    provide: MatDialogRef,
    useValue: {}
  },
  {
    provide: MatPasswordStrengthComponent,
    useValue: {}
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
