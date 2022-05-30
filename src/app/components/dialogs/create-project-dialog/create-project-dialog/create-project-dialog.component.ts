import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { getCurrentUserID } from 'src/app/helpers/localStorage';
import { CreateListService } from 'src/app/services/create-list/create-list.service';
import { ListServiceService } from 'src/app/services/list-service/list-service.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
})
export class CreateProjectDialogComponent implements OnInit {
  listName: string = '';
  listNameSrc: Subject<string>;
  listForm: FormGroup;
  isLoading: boolean = false;
  user: number;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private snackBar: MatSnackBar,
    public projectService: ProjectService
  ) {
    this.createListForm();
  }

  ngOnInit(): void {
    this.user = getCurrentUserID();
  }

  submit() {
    if (
      this.projectNameCtrl?.value.trim() === undefined ||
      this.projectNameCtrl?.value.trim() === null
    )
      return;
    this.isLoading = true;
    this.projectService
      .createProjects({
        userId: this.user,
        projectName: this.projectNameCtrl?.value.trim(),
      })
      .subscribe(
        (next) => {
          //this.projectService.myMethod(next.projectName);
          this.isLoading = false;
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open('Nem sikerült létrehozni a projektet!', '', {
            duration: 2000,
          });
          this.isLoading = false;
          this.listForm.reset();
          this.dialogRef.close();
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  createListForm() {
    this.listForm = this.formBuilder.group({
      projectNameCtrl: ['', Validators.required],
    });
  }

  get projectNameCtrl() {
    return this.listForm.get('projectNameCtrl');
  }
}
