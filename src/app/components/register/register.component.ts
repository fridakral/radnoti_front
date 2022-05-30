import { HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  userForm: FormGroup;
  asd = false;
  isLoading: boolean = false;
  success: boolean;
  durationInSeconds: number = 2;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get email() {
    return this.userForm.get('email');
  }

  get firstname() {
    return this.userForm.get('firstname');
  }

  get lastname() {
    return this.userForm.get('lastname');
  }

  async onSubmit() {
    this.isLoading = true;
    this.userService
      .createUser({
        userName: this.username?.value,
        password: this.password?.value,
        userEmail: this.email?.value,
        firstName: this.firstname?.value,
        lastName: this.lastname?.value,
      })
      .subscribe(
        (next) => {
          this.snackBar.open('Sikeres regisztráció!', '', {
            duration: this.durationInSeconds * 1000,
          });
          this.router.navigate(['login']);
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Sikertelen regisztráció!', '', {
            duration: this.durationInSeconds * 1000,
          });
          this.isLoading = false;
        },
        () => (this.isLoading = false)
      );
  }

  getUsernameMessage() {
    return this.username?.hasError('required') ? 'Kötelező!' : '';
  }
  getErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Kötelező!';
    }
    return this.password?.hasError('minLength') ? (this.asd = true) : '';
  }
  getEmailMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  getFirstnameMessage() {
    return this.firstname?.hasError('required') ? 'Kötelező!' : '';
  }

  getLastnameMessage() {
    return this.lastname?.hasError('required') ? 'Kötelező!' : '';
  }
}
