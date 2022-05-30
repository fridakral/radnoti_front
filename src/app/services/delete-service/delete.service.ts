import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  deleteProject$: Observable<boolean>;
  private deleteProjectSubject = new Subject<boolean>();

  deleteTaskList$: Observable<number>;
  private deleteTaskListSubject = new Subject<number>();

  deleteComment$: Observable<number>;
  private deleteCommentSubject = new Subject<number>();

  constructor() {
    this.deleteProject$ = this.deleteProjectSubject.asObservable();
    this.deleteTaskList$ = this.deleteTaskListSubject.asObservable();
    this.deleteComment$ = this.deleteCommentSubject.asObservable();
  }

  deleteProject(data: boolean) {
    this.deleteProjectSubject.next(data);
  }

  deleteTaskList(taskListId: number) {
    this.deleteTaskListSubject.next(taskListId);
  }

  deleteComment(taskCommentId: number) {
    this.deleteCommentSubject.next(taskCommentId);
  }
}
