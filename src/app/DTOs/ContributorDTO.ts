export class contributorsDTO {
  userId: number;
  userName: string;
  userEmail: string;
  role: string;
}
export class newContributorDTO {
  id?: number;
  name: string;
  role: string;
}

export interface addNewContrsDTO {
  taskId: number;
  userId: number[];
}

export interface tempuserDTO {
  id: number;
  userName: string;
}

export interface removeUserFromTaskDTO {
  userId: number;
  taskId: number;
}
