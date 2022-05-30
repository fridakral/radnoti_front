import { taskDTO } from './TaskDTO';

export interface CreteListObj {
  projectId: number;
  position: number;
  listName: string;
}

export interface ListDTO {
  listId?: number;
  listPosition?: number;
  listName: string;
  tasks: taskDTO[];
}

export interface ListsDataObj {
  listName: string;
  taskNumber: number;
}

export interface MoveDTO {
  projectId: number;
  listPosition: number;
}
