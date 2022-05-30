import { Injectable } from '@angular/core';
import { CreteListObj, ListDTO, MoveDTO } from 'src/app/DTOs/ListDTOs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListServiceService {
  constructor(private http: HttpClient) {}

  moveListToLeft(move: MoveDTO) {
    return this.http.post<MoveDTO>(
      `${environment.apiUrl}/api/list/moveLeft`,
      move
    );
  }

  moveListToRight(move: MoveDTO) {
    return this.http.post<MoveDTO>(
      `${environment.apiUrl}/api/list/moveRight`,
      move
    );
  }

  createList(list: CreteListObj) {
    return this.http.post<CreteListObj>(`${environment.apiUrl}/api/list`, list);
  }

  getLists(projectID: number) {
    return this.http.get<ListDTO[]>(
      `${environment.apiUrl}/api/list/findByProject/${projectID}`
    );
  }

  moveList(moveListData: MoveListDataObj) {
    return this.http
      .post<MoveListDataObj>(
        `${environment.apiUrl}/api/list/move`,
        moveListData
      )
      .subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}

export class MoveListDataObj {
  projectId: number;
  startPosition: number;
  endPosition: number;
}
