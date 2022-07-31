import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProcessService, AuthProvider} from '../../services/auth-process.service';
import {Subscription} from 'rxjs';
import {NgxAuthFirebaseuiAnimations} from '../../animations';
import {isPlatformBrowser} from '@angular/common';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {ThemePalette} from '@angular/material/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-auth-firebaseui-login',
  templateUrl: './ngx-auth-firebaseui-login.component.html',
  styleUrls: ['./ngx-auth-firebaseui-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: NgxAuthFirebaseuiAnimations
})
export class NgxAuthFirebaseuiLoginComponent implements OnInit {

  @Input() logoUrl = '';
  @Input() providers: AuthProvider[] | AuthProvider = AuthProvider.ALL; //  google, facebook, twitter, github as array or all as one single string
  @Input() appearance  = 'standard' as MatFormFieldAppearance;
  @Input() registrationEnabled = true;
  @Input() resetPasswordEnabled = true;
  @Input() messageOnAuthSuccess = '';
  @Input() messageOnAuthError = '';

  // i18n
  @Input() titleText = 'LOGIN TO YOUR ACCOUNT';
  @Input() rememberMeText = 'Remember Me';
  @Input() loginButtonText = 'LOGIN';
  @Input() orLabelText = 'OR';
  @Input() forgotPasswordText = 'Forgot Password?';
  @Input() dontHaveAnAccountText = 'Don\'t have an account?';
  @Input() createAccountButtonText = 'Create an account';

  // i18n email
  @Input() emailText = 'Email';
  @Input() emailErrorRequiredText = 'Email is required';
  @Input() emailErrorPatternText = 'Please enter a valid email address';

  // i18n password
  @Input() passwordText = 'Password';
  @Input() passwordErrorRequiredText = 'Password is required';

  // Events
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSuccess: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onError: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCreateAccountRequested: EventEmitter<void> = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onResetPasswordRequested: EventEmitter<void> = new EventEmitter<void>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onLoginButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  loginForm: FormGroup;
  authProviders = AuthProvider;
  onErrorSubscription = Subscription.EMPTY;
  authenticationError = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    public authProcess: AuthProcessService,
    private formBuilder: FormBuilder) {
    this.onSuccess = authProcess.onSuccessEmitter;
    this.onError = authProcess.onErrorEmitter;
    this.loginForm = new FormGroup({});
  }

  get color(): string | ThemePalette {
    return this.authenticationError ? 'warn' : 'primary';
  }

  get colorAccent(): string | ThemePalette {
    return this.authenticationError ? 'warn' : 'accent';
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.onErrorSubscription = this.onError.subscribe(() => this.authenticationError = true);
    }

    this.updateAuthSnackbarMessages();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public updateAuthSnackbarMessages(): void {
    this.authProcess.messageOnAuthSuccess = this.messageOnAuthSuccess;
    this.authProcess.messageOnAuthError = this.messageOnAuthError;
  }

  async login() {
    // Emit event for button click
    this.onLoginButtonClicked.emit();

    return await this.authProcess.signInWith(this.authProviders.EmailAndPassword,
      {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }
    );
  }
}
