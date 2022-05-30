export interface taskListDTO {
  taskListId?: number;
  taskListName: string;
  taskListItems: newTaskListItemDTO[];
}

export interface taskListItemDTO {
  taskListItemId?: number;
  taskListItemName: string;
  isDone: boolean;
}

export interface newTaskListItemDTO {
  taskListItemId?: number;
  taskListItemName: string;
  isDone: boolean;
}

export class createTaskListDTO {
  taskListId?: number;
  taskListName: string;
  taskId: number;
}

export class createTaskListItemDTO {
  taskListId: number;
  itemName: string;
  id?: number;
  isDone: boolean;
}

export class updateTaskListItemDTO {
  taskListId: number;
  taskListName: string;
  taskListItems: taskListItemDTO[];
}
