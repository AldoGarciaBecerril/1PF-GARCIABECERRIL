import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Services */
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (student) => {
            if (student) {
              alert('Logged in ' + student.firstName);
              this._authService.saveIdentity(student);
            } else {
              alert('Invalid credentials');
            }
          },
          error: (err) => console.error(err),
        });
    } else {
      alert('Please fill the form');
    }
  }
}
