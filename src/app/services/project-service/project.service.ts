import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CreateProjectDTO, ProjectsObj } from 'src/app/DTOs/ProjectsDTOs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  myMethod$: Observable<string>;
  private myMethodSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  getAllProjectsByID(userID: number) {
    return this.http.get<ProjectsObj[]>(
      `${environment.apiUrl}/api/project/findAllByUserId/${userID}`
    );
  }

  createProjects(project: CreateProjectDTO) {
    return this.http.post<CreateProjectDTO>(
      `${environment.apiUrl}/api/project`,
      project
    );
  }

  deleteProject(projectid: number) {
    return this.http.post(
      `${environment.apiUrl}/api/project/delete/${projectid}`,
      projectid
    );
  }

  myMethod(data: string) {
    this.myMethodSubject.next(data);
  }
}
