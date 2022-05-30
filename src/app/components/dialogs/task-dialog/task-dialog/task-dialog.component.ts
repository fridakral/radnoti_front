import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { commentDTO, createCommentDTO } from 'src/app/DTOs/CommentDTO';
import {
  addNewContrsDTO,
  contributorsDTO,
  removeUserFromTaskDTO,
} from 'src/app/DTOs/ContributorDTO';
import {
  addDeadlineDTO,
  setTaskPriorityDTO,
  taskDetailDTO,
  updateTaskDTO,
} from 'src/app/DTOs/TaskDTO';
import { createTaskListDTO, taskListDTO } from 'src/app/DTOs/TaskListDTO';
import { UserDTO, UserUpdateDTO } from 'src/app/DTOs/UserDTO';
import {
  getCurrentProjectID,
  getCurrentUserID,
  getCurrentUserName,
} from 'src/app/helpers/localStorage';
import { snack } from 'src/app/helpers/snack';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import {
  modifyTaskObj,
  TaskServiceService,
} from 'src/app/services/task-service/task-service.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user-service/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { priority } from 'src/app/models/enums/priorityEnum';
import { MoveService } from 'src/app/services/move-service/move.service';
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  commentForm: FormGroup;
  taskListForm: FormGroup;
  contributorsForm: FormGroup;
  taskData: taskDetailDTO;
  taskid: number;
  noMoreUser: boolean = false;
  nameEdit: Boolean = false;
  creatingTaskList: Boolean = false;
  creatingComment: Boolean = false;
  addContributors: Boolean = false;
  editingTask: Boolean = false;
  deadlineChange: Boolean = false;
  priorityChange: Boolean = false;
  allUsersInProject: contributorsDTO[];
  selectedUsers: contributorsDTO[];
  priority: priority;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService,
    private snack: snack,
    private deleteService: DeleteService,
    private userService: UserService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private moveService: MoveService,
    @Inject(MAT_DIALOG_DATA) public data: { taskID: number }
  ) {
    this.deleteService.deleteTaskList$.subscribe((res) => {
      let index = this.taskData.taskLists.findIndex(
        (x) => x.taskListId === res
      );
      if (index != -1) this.taskData.taskLists.splice(index, 1);
    });

    this.deleteService.deleteComment$.subscribe((res) => {
      let index = this.taskData.comments?.findIndex(
        (x) => x.taskCommentId === res
      );
      if (index != -1) this.taskData.comments?.splice(index as number, 1);
    });
  }

  ngOnInit(): void {
    this.taskData = {
      taskName: '',
      isDone: true,
      contributors: [],
      createdOn: new Date(),
      taskLists: [],
      comments: [],
    };
    this.taskid = this.data.taskID;
    this.userService
      .getAllContributors(getCurrentProjectID())
      .subscribe((res) => {
        this.allUsersInProject = res;
      });
    this.taskService.getDetailedTaskDataByTaskID(this.taskid).subscribe(
      (resoult) => {
        this.taskData = resoult;
        this.taskData.contributors.forEach((p) => {
          let index = this.allUsersInProject.findIndex(
            (x) => x.userName == p.userName
          );
          console.log(index);
          if (index != -1) this.allUsersInProject.splice(index, 1);
        });
        if (this.allUsersInProject.length == 0) this.noMoreUser = true;
        console.log(resoult);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('Az adatok betöltése sikertelen!', 'close', 2);
      }
    );

    this.createTaskForm();
    this.createContributorsForm();
    this.createCommentForm();
    this.createTaskListForm();
  }

  prioritySelected(value: any) {
    let data: setTaskPriorityDTO = {
      taskid: this.taskid,
      priority: value.value,
    };
    this.taskService.setTaskPriority(data).subscribe((res) => {
      this.taskData.priority = res.priority;
    });
    this.priorityChange = false;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let data: addDeadlineDTO = {
      deadline: event.value as Date,
      taskId: this.taskid,
    };
    if ((event.value as Date) == null) {
      this.deadlineChange = false;
      return;
    }
    this.taskService.addDeadline(data).subscribe(
      (res) => {
        this.taskData.deadline = res.deadline;
      },
      (error: HttpErrorResponse) => {}
    );
    this.deadlineChange = false;
  }

  editTask() {
    let update: updateTaskDTO = {
      taskId: this.taskid,
      taskName: this.taskName?.value,
      taskDescription: this.taskDescName?.value,
    };
    this.taskService.updateTask(update).subscribe(
      (res) => {
        this.taskData.taskName = res.taskName as string;
        this.taskData.taskDescription = res.taskDescription as string;
        let data: modifyTaskObj = {
          taskId: this.taskid,
          taskName: res.taskName as string,
          taskDescription: res.taskDescription as string,
        };
        this.taskService.modifyTask(data);
      },
      (error: HttpErrorResponse) => {}
    );
    this.editingTask = false;
    this.taskForm.reset();
  }

  removeContributorFromTask(id: number) {
    let data: removeUserFromTaskDTO = {
      userId: id,
      taskId: this.taskid,
    };
    this.taskService.removeContributorFromTask(data).subscribe((res) => {});
  }

  drop(event: CdkDragDrop<contributorsDTO[]>) {
    moveItemInArray(
      this.taskData.contributors,
      event.previousIndex,
      event.currentIndex
    );
  }

  submit() {
    //this.taskService.updateTask()
  }

  createNewComment() {
    let newComment: createCommentDTO = {
      userId: getCurrentUserID(),
      comment: this.taskCommentName?.value,
      taskId: this.taskData.taskId as number,
    };
    this.taskService.createComment(newComment).subscribe(
      (resoult) => {
        let username = getCurrentUserName();
        let comment: commentDTO = {
          taskCommentId: resoult.taskCommentId,
          createdOn: resoult.createdOn as Date,
          createdBy: username,
          comment: resoult.comment,
        };
        this.taskData.comments?.push(comment);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('A komment létrehozása sikertelen!', 'close', 2);
      }
    );
    this.creatingComment = false;
    this.commentForm.reset();
  }

  createNewTaskList() {
    let newTaskList: createTaskListDTO = {
      taskId: this.taskid,
      taskListName: this.taskListName?.value,
    };
    this.taskService.createTaskList(newTaskList).subscribe(
      (resoult) => {
        let newList: taskListDTO = {
          taskListId: resoult.taskListId,
          taskListName: resoult.taskListName,
          taskListItems: [],
        };
        this.taskData.taskLists.push(newList);
        this.creatingTaskList = false;
      },
      (error: HttpErrorResponse) => {
        this.snack.response('A lista létrehozása sikertelen!', 'close', 2);
      }
    );
    this.taskListForm.reset();
  }

  addContributor() {
    let userids: number[] = [];
    this.selectedUsers.forEach((element) => {
      userids.push(element.userId);
    });
    console.log(userids);

    let users: addNewContrsDTO = {
      taskId: this.taskid,
      userId: userids,
    };
    this.taskService.addContributors(users).subscribe(
      (addedUser) => {},
      (error: HttpErrorResponse) => {}
    );
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskid).subscribe(
      () => {
        this.dialogRef.close();
        this.moveService.moveList(true);
      },
      (error: HttpErrorResponse) => {}
    );
  }

  createTaskForm() {
    this.taskForm = this.formBuilder.group({
      taskName: [this.taskData.taskName],
      taskDescName: [this.taskData.taskDescription],
    });
  }

  get taskName() {
    return this.taskForm.get('taskName');
  }

  get taskDescName() {
    return this.taskForm.get('taskDescName');
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      taskCommentName: ['', Validators.required],
    });
  }

  get taskCommentName() {
    return this.commentForm.get('taskCommentName');
  }

  createTaskListForm() {
    this.taskListForm = this.formBuilder.group({
      taskListName: ['', Validators.required],
    });
  }

  get taskListName() {
    return this.taskListForm.get('taskListName');
  }

  createContributorsForm() {
    this.contributorsForm = this.formBuilder.group({
      contributorsCtrl: ['', Validators.required],
    });
  }

  get contributorsCtrl() {
    return this.taskListForm.get('contributorsCtrl');
  }
}
