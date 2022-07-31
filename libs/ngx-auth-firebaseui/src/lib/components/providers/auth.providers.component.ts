import {Component, Input, Output} from '@angular/core';
import {AuthProcessService, AuthProvider} from '../../services/auth-process.service';
import {NgxAuthFirebaseuiAnimations} from '../../animations';
import {Layout, LegalityDialogParams, LegalityDialogResult, Theme} from '../../interfaces';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LegalityDialogComponent} from '../legality-dialog/legality-dialog.component';

@Component({
  selector: 'ngx-auth-firebaseui-providers',
  templateUrl: 'auth.providers.component.html',
  styleUrls: ['auth.providers.component.scss'],
  animations: NgxAuthFirebaseuiAnimations
})
export class AuthProvidersComponent {

  @Input() theme: string = Theme.DEFAULT; // theme: string = Theme.DEFAULT;
  @Input() layout: string = Layout.ROW;
  @Input() providers: AuthProvider[] | AuthProvider = AuthProvider.ALL; //  google, facebook, twitter, github, microsoft, yahoo

  @Output() onSuccess: any;
  @Output() onError: any;

  @Input() tosUrl: string;
  @Input() privacyPolicyUrl: string;
  //dialogRef: MatDialogRef<LegalityDialogComponent>;

  themes = Theme;
  authProvider = AuthProvider;

  constructor(public authProcess: AuthProcessService, public dialog: MatDialog, public dialogRef: MatDialogRef<LegalityDialogComponent>) {
    this.onSuccess = authProcess.onSuccessEmitter;
    this.onError = authProcess.onErrorEmitter;
    this.privacyPolicyUrl = '';
    this.tosUrl = '';
    this.theme = Theme.DEFAULT;
  }

  processLegalSignUP(authProvider?: AuthProvider) {
    if(authProvider){
      if (this.tosUrl || this.privacyPolicyUrl) {      
          const params: LegalityDialogParams = {
            tosUrl: this.tosUrl,
            privacyPolicyUrl: this.privacyPolicyUrl,
            authProvider
          };
        
        this.dialogRef = this.dialog.open(LegalityDialogComponent, {data: params});
        this.dialogRef.afterClosed().subscribe((result: LegalityDialogResult) => {
          if (result && result.checked) {
            // this._afterSignUpMiddleware(result.authProvider).then(() => this.signUpFormGroup.reset());
            this.authProcess.signInWith(authProvider);
          }
          this.dialogRef = <any>null;          
        });
      } else {
        // this._afterSignUpMiddleware(authProvider).then(() => this.signUpFormGroup.reset());
        this.authProcess.signInWith(authProvider);
      }
    }
  }

}
