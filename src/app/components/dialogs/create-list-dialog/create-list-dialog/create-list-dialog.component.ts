import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DialogData } from 'src/app/helpers/dialog';
import { getCurrentProjectID } from 'src/app/helpers/localStorage';
import { CreateListService } from 'src/app/services/create-list/create-list.service';
import { ListServiceService } from 'src/app/services/list-service/list-service.service';

@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.scss'],
})
export class CreateListDialogComponent implements OnInit {
  listName: string = '';
  listNameSrc: Subject<string>;
  listForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { currentListsLength: number },
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateListDialogComponent>,
    private listService: ListServiceService,
    private snackBar: MatSnackBar,
    public listValueService: CreateListService
  ) {
    this.createListForm();
  }

  ngOnInit(): void {}

  submit() {
    if (
      this.listNameCtrl?.value.trim() === undefined ||
      this.listNameCtrl?.value.trim() === null
    )
      return;
    this.isLoading = true;
    var projectID = getCurrentProjectID();
    this.listService
      .createList({
        projectId: projectID,
        position: this.data.currentListsLength,
        listName: this.listNameCtrl?.value.trim(),
      })
      .subscribe(
        (next) => {
          //this.listValueService.myMethod(this.listNameCtrl?.value.trim());
          this.snackBar.open('A lista létrehozása sikeres!', '', {
            duration: 2000,
          });
          this.isLoading = false;
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.listValueService.myMethod(this.listNameCtrl?.value.trim());
          console.log(err);
          this.snackBar.open('Nem sikerült létrehozni a listát!', '', {
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
      listNameCtrl: ['', Validators.required],
    });
  }

  get listNameCtrl() {
    return this.listForm.get('listNameCtrl');
  }
}
