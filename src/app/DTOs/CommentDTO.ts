export class commentDTO {
  taskCommentId?: number;
  createdOn: Date;
  createdBy: string;
  comment: string;
}

export interface createCommentDTO {
  taskId: number;
  userId: number;
  comment: string;
  createdOn?: Date;
  taskCommentId?: number;
}

export interface updateCommentDTO {
  comment: string;
  taskCommentId: number;
}
