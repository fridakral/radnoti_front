export class UserDTO {
  userName: string;
  password: string;
  userEmail: string;
  firstName: string;
  lastName: string;
}

export interface UserLoginDTO {
  id?: number;
  verified?: Boolean;
  username: string;
  password: string;
  token?: string;
}

export interface UserUpdateDTO {
  id?: number;
  userName?: string;
  password?: string;
  userEmail?: string;
}
export interface UserIDDTO {
  id: number;
}
