import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  createTaskListItemDTO,
  newTaskListItemDTO,
  taskListDTO,
  taskListItemDTO,
  updateTaskListItemDTO,
} from 'src/app/DTOs/TaskListDTO';
import { snack } from 'src/app/helpers/snack';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() _data: taskListDTO;
  listData: taskListDTO;
  isFormEnabled: boolean = false;
  taskListItemForm: FormGroup;
  constructor(
    private taskService: TaskServiceService,
    private snack: snack,
    private formBuilder: FormBuilder,
    private deleteService: DeleteService
  ) {}

  ngOnInit(): void {
    if (!this._data.taskListItems) this._data.taskListItems = [];
    this.listData = this._data;
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.listData.taskListItems != null &&
      this.listData.taskListItems.every((t) => t.isDone);
    let items: newTaskListItemDTO[] = [];
    this.listData.taskListItems.forEach((item) => {
      items.push(item);
    });
    let data: updateTaskListItemDTO = {
      taskListItems: items,
      taskListName: this.listData.taskListName,
      taskListId: this.listData.taskListId as number,
    };
    this.taskService.updateTaskListByID(data).subscribe(
      (res) => {},
      (error: HttpErrorResponse) => {}
    );
  }

  someComplete(): boolean {
    if (this.listData.taskListItems == null) {
      return false;
    }
    this.listData.taskListItems.filter((t) => t.isDone);
    return (
      this.listData.taskListItems.filter((t) => t.isDone).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listData.taskListItems == null) {
      return;
    }
    this.listData.taskListItems.forEach((t) => (t.isDone = completed));
    let items: newTaskListItemDTO[] = [];
    this.listData.taskListItems.forEach((item) => {
      items.push(item);
    });
    let data: updateTaskListItemDTO = {
      taskListItems: items,
      taskListName: this.listData.taskListName,
      taskListId: this.listData.taskListId as number,
    };
    this.taskService.updateTaskListByID(data).subscribe(
      (res) => {},
      (error: HttpErrorResponse) => {}
    );
  }

  createNewItem() {
    let newItem: createTaskListItemDTO = {
      itemName: this.taskListItemName?.value,
      isDone: false,
      taskListId: this.listData.taskListId as number,
    };
    this.taskService.createTaskListItem(newItem).subscribe(
      (res) => {
        let item: newTaskListItemDTO = {
          taskListItemId: res.id,
          taskListItemName: res.itemName,
          isDone: res.isDone,
        };
        this.listData.taskListItems.push(item);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('A lista elem létrehozása sikertelen!', 'close', 2);
      }
    );
    this.isFormEnabled = false;
  }

  changeToInput() {
    this.createTaskListItemForm();
    this.isFormEnabled = !this.isFormEnabled;
  }

  createTaskListItemForm() {
    this.taskListItemForm = this.formBuilder.group({
      taskListItemName: ['', Validators.required],
    });
  }

  get taskListItemName() {
    return this.taskListItemForm.get('taskListItemName');
  }

  deleteTaskList() {
    this.taskService
      .deleteTaskList(this.listData.taskListId as number)
      .subscribe(
        (res) => {
          this.deleteService.deleteTaskList(this.listData.taskListId as number);
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 200:
              this.deleteService.deleteTaskList(
                this.listData.taskListId as number
              );
              break;
            default:
              break;
          }
        }
      );
  }
}
