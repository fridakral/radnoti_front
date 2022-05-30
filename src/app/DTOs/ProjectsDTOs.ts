import { ListsDataObj } from './ListDTOs';

export interface ProjectsObj {
  projectId: number;
  projectName: string;
  lists: ListsDataObj[];
}

export interface CreateProjectDTO {
  projectId?: number;
  userId: number;
  projectName: string;
}
