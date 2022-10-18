export interface IUserRequest {
  name: string;
  email: string;
  isAdm: boolean;
  password?: string;
}

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserResponse {
  name: string;
  email: string;
  isAdm: boolean;
  id: string;
}
export interface IUserResponseGet {
  name: string;
  email: string;
  isAdm: boolean;
  id: string;
}
