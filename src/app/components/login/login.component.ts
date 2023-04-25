import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponce } from 'src/app/models/credentail';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onRegisterFormSubmit() {
    this.generalService.loaderEvent.next(true);

    this.authService
      .logIn(this.registerForm.value)
      .subscribe((res: LoginResponce) => {
        if (res.token) {
          this.generalService.loaderEvent.next(false);
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.router.navigateByUrl('library/organisation');
        } else {
          this.generalService.loaderEvent.next(false);
          this.generalService.alertEvent.next({
            title: 'Error!',
            text: res.msg,
          });
        }
      });
  }
}
