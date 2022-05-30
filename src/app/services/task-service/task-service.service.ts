import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  commentDTO,
  createCommentDTO,
  updateCommentDTO,
} from 'src/app/DTOs/CommentDTO';
import {
  addNewContrsDTO,
  contributorsDTO,
  removeUserFromTaskDTO,
} from 'src/app/DTOs/ContributorDTO';
import {
  addDeadlineDTO,
  createTaskDTO,
  setTaskPriorityDTO,
  taskDetailDTO,
  taskDTO,
  updateTaskDTO,
} from 'src/app/DTOs/TaskDTO';
import {
  createTaskListDTO,
  createTaskListItemDTO,
  taskListDTO,
  taskListItemDTO,
  updateTaskListItemDTO,
} from 'src/app/DTOs/TaskListDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  modifyTask$: Observable<modifyTaskObj>;
  private modifyTaskSubject = new Subject<modifyTaskObj>();

  constructor(private http: HttpClient) {
    this.modifyTask$ = this.modifyTaskSubject.asObservable();
  }

  deleteTask(taskId: number) {
    return this.http.post(
      `${environment.apiUrl}/api/task/delete/${taskId}`,
      null
    );
  }

  setTaskPriority(data: setTaskPriorityDTO) {
    return this.http.post<setTaskPriorityDTO>(
      `${environment.apiUrl}/api/task/priority`,
      data
    );
  }

  modifyTask(data: modifyTaskObj) {
    this.modifyTaskSubject.next(data);
  }

  updateTask(data: updateTaskDTO) {
    return this.http.post<updateTaskDTO>(
      `${environment.apiUrl}/api/task/update`,
      data
    );
  }

  addDeadline(data: addDeadlineDTO) {
    return this.http.post<addDeadlineDTO>(
      `${environment.apiUrl}/api/task/adddeadline`,
      data
    );
  }

  removeContributorFromTask(data: removeUserFromTaskDTO) {
    return this.http.post<removeUserFromTaskDTO>(
      `${environment.apiUrl}/api/task/removeuserfromtask`,
      data
    );
  }

  createTaskList(taskList: createTaskListDTO) {
    return this.http.post<createTaskListDTO>(
      `${environment.apiUrl}/api/tasklist/save`,
      taskList
    );
  }

  createTaskListItem(taskListItem: createTaskListItemDTO) {
    return this.http.post<createTaskListItemDTO>(
      `${environment.apiUrl}/api/tasklistitem/save`,
      taskListItem
    );
  }

  createNewTask(task: createTaskDTO) {
    return this.http.post<createTaskDTO>(
      `${environment.apiUrl}/api/task`,
      task
    );
  }

  createComment(comment: createCommentDTO) {
    return this.http.post<createCommentDTO>(
      `${environment.apiUrl}/api/taskcomment/save`,
      comment
    );
  }

  getDetailedTaskDataByTaskID(taskID: number) {
    return this.http.get<taskDetailDTO>(
      `${environment.apiUrl}/api/task/detailedtask/${taskID}`
    );
  }

  moveTaskDataBetweenTasks(
    moveTaskDataBetweenTasksData: MoveTaskDataBetweenTasksObj
  ) {
    return this.http.post<MoveTaskDataBetweenTasksObj>(
      `${environment.apiUrl}/api/task/movetaskbetweenlists`,
      moveTaskDataBetweenTasksData
    );
  }

  moveTask(moveTaskData: MoveTaskDataObj) {
    return this.http.post<MoveTaskDataObj>(
      `${environment.apiUrl}/api/task/movetaskinlist`,
      moveTaskData
    );
  }

  updateTaskListByID(taskListItems: updateTaskListItemDTO) {
    return this.http.post<updateTaskListItemDTO>(
      `${environment.apiUrl}/api/tasklist/updatetasklist`,
      taskListItems
    );
  }

  deleteTaskList(taskListID: number) {
    return this.http.post<string>(
      `${environment.apiUrl}/api/tasklist/delete/${taskListID}`,
      null
    );
  }

  addContributors(data: addNewContrsDTO) {
    return this.http.post<addNewContrsDTO>(
      `${environment.apiUrl}/api/task/addusers`,
      data
    );
  }

  deleteTaskComment(taskCommentId: number) {
    return this.http.post(
      `${environment.apiUrl}/api/taskcomment/delete/${taskCommentId}`,
      null
    );
  }

  updateTaskComment(data: updateCommentDTO) {
    return this.http.post<updateCommentDTO>(
      `${environment.apiUrl}/api/taskcomment/update`,
      data
    );
  }
}

export class MoveTaskDataObj {
  listId: number;
  startPosition: number;
  endPosition: number;
}

export class MoveTaskDataBetweenTasksObj {
  startListId: number;
  endListId: number;
  startTaskPosition: number;
  endTaskPosition: number;
  startListLength: number;
  endListLength: number;
}

export interface modifyTaskObj {
  taskId: number;
  taskName: string;
  taskDescription: string;
}
