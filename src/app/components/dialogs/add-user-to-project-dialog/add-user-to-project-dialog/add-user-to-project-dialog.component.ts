import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { getCurrentProjectID } from 'src/app/helpers/localStorage';
import {
  emailDetailsDTO,
  EmailService,
} from 'src/app/services/email-service/email.service';

@Component({
  selector: 'app-add-user-to-project-dialog',
  templateUrl: './add-user-to-project-dialog.component.html',
  styleUrls: ['./add-user-to-project-dialog.component.scss'],
})
export class AddUserToProjectDialogComponent implements OnInit {
  emailForm: FormGroup;
  filteredOptions: Observable<string[]>;
  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private dialogRef: MatDialogRef<AddUserToProjectDialogComponent>
  ) {}

  ngOnInit(): void {
    this.createEmailForm();
    //getAllEmails
  }

  submit() {
    let pId = getCurrentProjectID();
    let data: emailDetailsDTO = {
      projectId: pId,
      toEmail: this.email?.value,
    };
    this.emailService.sendEmail(data).subscribe(
      (res) => {
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        //response
      }
    );
  }

  createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.emailForm.get('email');
  }
}
