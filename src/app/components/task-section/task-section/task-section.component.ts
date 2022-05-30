import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListDTO, MoveDTO } from 'src/app/DTOs/ListDTOs';
import {
  getCurrentProjectID,
  getCurrentUserID,
} from 'src/app/helpers/localStorage';
import { snack } from 'src/app/helpers/snack';
import { ListServiceService } from 'src/app/services/list-service/list-service.service';
import { MoveService } from 'src/app/services/move-service/move.service';
import {
  MoveTaskDataBetweenTasksObj,
  MoveTaskDataObj,
  TaskServiceService,
} from 'src/app/services/task-service/task-service.service';
import { createTaskDTO, taskDTO } from '../../../DTOs/TaskDTO';
@Component({
  selector: 'app-task-section',
  templateUrl: './task-section.component.html',
  styleUrls: ['./task-section.component.scss'],
})
export class TaskSectionComponent implements OnInit {
  @Input() listID: number;
  @Input() title: string;
  @Input() _tasks: taskDTO[];
  @Input() listsLength: number;
  @Input() listPosition: number;

  createTaskForm: FormGroup;
  tasks: any[];
  createTaskBool: boolean = false;
  listid: number;
  lists: any[];
  isListFirst: Boolean;
  isListLast: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService,
    private listService: ListServiceService,
    private snack: snack,
    private moveService: MoveService
  ) {
    this.createListForm();
  }

  ngOnInit() {
    this.tasks = this._tasks;
    this.listid = this.listID;
    this.isListLast = this.listPosition == this.listsLength - 1 ? true : false;
    this.isListFirst = this.listPosition == 0 ? true : false;
  }

  ngOnDestroy() {
    this.tasks = [];
    let asd = document.getElementById('fasz')?.remove();
  }

  moveListToLeft() {
    let position: MoveDTO = {
      listPosition: this.listPosition,
      projectId: getCurrentProjectID(),
    };
    this.listService.moveListToLeft(position).subscribe(
      (res) => {
        this.moveService.moveList(true);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('Lista mozgatása sikertelen volt :/', undefined, 1);
      }
    );
  }

  moveListToRight() {
    let position: MoveDTO = {
      listPosition: this.listPosition,
      projectId: getCurrentProjectID(),
    };
    this.listService.moveListToRight(position).subscribe(
      (res) => {
        this.moveService.moveList(true);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('Lista mozgatása sikertelen volt :/', undefined, 1);
      }
    );
  }

  createTaskAction() {
    var task: createTaskDTO = {
      positionInList: this.tasks.length,
      taskName: this.taskNameCtrl?.value.trim(),
      listId: this.listid,
    };
    this.taskService.createNewTask(task).subscribe((res) => {
      this.tasks.push(res);
    });
    this.createTaskBool = false;
    this.createTaskForm.reset();
  }

  createTask() {
    this.createTaskBool = true;
  }

  createListForm() {
    this.createTaskForm = this.formBuilder.group({
      taskNameCtrl: ['', Validators.required],
    });
  }

  get taskNameCtrl() {
    return this.createTaskForm.get('taskNameCtrl');
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var listID = Number(event.container.id.substring(14));
      var obj1: MoveTaskDataObj = {
        listId: this.listid,
        startPosition: event.previousIndex,
        endPosition: event.currentIndex,
      };
      try {
        this.taskService.moveTask(obj1).subscribe();
      } catch (e) {
        console.log(e);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var toListPosition = Number(event.container.id.substring(14));
      var fromListPosition = Number(event.previousContainer.id.substring(14));
      var obj: MoveTaskDataBetweenTasksObj = {
        startTaskPosition: event.previousIndex,
        endTaskPosition: event.currentIndex,
        startListId: event.previousContainer.autoScrollStep as number,
        endListId: event.container.autoScrollStep as number,
        startListLength: event.previousContainer.data.length,
        endListLength: event.container.data.length,
      };
      try {
        this.taskService.moveTaskDataBetweenTasks(obj).subscribe();
      } catch (e) {
        console.log(e);
      }
    }
  }
}
