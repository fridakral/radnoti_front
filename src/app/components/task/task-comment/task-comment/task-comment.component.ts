import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { commentDTO, updateCommentDTO } from 'src/app/DTOs/CommentDTO';
import { getCurrentUserName } from 'src/app/helpers/localStorage';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss'],
})
export class TaskCommentComponent implements OnInit {
  @Input() _data: commentDTO;

  user: string;
  commentId: number;
  isEditing: Boolean = false;
  commentEditForm: FormGroup;
  data: commentDTO;
  constructor(
    private deleteService: DeleteService,
    private taskService: TaskServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.data = this._data;
    this.user = getCurrentUserName();
    this.createCommentForm();
    this.commentId = this._data.taskCommentId as number;
  }

  removeComment() {
    this.taskService.deleteTaskComment(this.commentId).subscribe(
      () => {},
      (error: HttpErrorResponse) => {}
    );
    this.deleteService.deleteComment(this.commentId);
  }
  saveChanges() {
    let commentData: updateCommentDTO = {
      comment: this.taskCommentName?.value,
      taskCommentId: this.commentId,
    };
    this.taskService.updateTaskComment(commentData).subscribe(
      (res) => {
        this.data.comment = res.comment;
      },
      (error: HttpErrorResponse) => {}
    );
    this.commentEditForm.reset();
    this.isEditing = false;
  }

  createCommentForm() {
    this.commentEditForm = this.formBuilder.group({
      taskCommentName: ['', Validators.required],
    });
  }

  get taskCommentName() {
    return this.commentEditForm.get('taskCommentName');
  }
}
