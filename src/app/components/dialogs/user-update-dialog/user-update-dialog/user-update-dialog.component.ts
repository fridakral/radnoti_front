import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/helpers/dialog';
import { getCurrentUserID } from 'src/app/helpers/localStorage';
import { HeaderServiceService } from 'src/app/services/header-service/header-service.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss'],
})
export class UserUpdateDialogComponent implements OnInit {
  userForm: FormGroup;
  asd = false;
  isLoading: boolean = false;
  success: boolean;
  durationInSeconds: number = 2;
  currentUserName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private header: HeaderServiceService
  ) {
    this.userForm = this.fb.group({
      username: [''],
      password1: ['', [Validators.minLength(3)]],
      email: ['', [Validators.email]],
    });
  }

  ngOnInit(): void {
    this.currentUserName = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    ).name;
  }

  get username() {
    return this.userForm.get('username');
  }

  get password1() {
    return this.userForm.get('password1');
  }

  get email() {
    return this.userForm.get('email');
  }

  async onSubmit() {
    this.isLoading = true;
    var user = getCurrentUserID();

    this.userService
      .userUpdate(
        {
          userName: this.username?.value,
          password: this.password1?.value,
          userEmail: this.email?.value,
        },
        user
      )
      .subscribe(
        (next) => {
          this.snackBar.open('Az adatok módosítása sikeres volt!', '', {
            duration: this.durationInSeconds * 1000,
          });
          this.isLoading = false;
          this.userService.updateHeader(this.username?.value);
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.snackBar.open('Az adatok módosítása nem sikerült!', '', {
            duration: this.durationInSeconds * 1000,
          });
          this.isLoading = false;
          this.dialogRef.close();
        },
        () => (this.isLoading = false)
      );
  }
}
