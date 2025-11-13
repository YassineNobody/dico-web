export interface User {
  id: number;
  uuid: string;
  email: string;
  username: string;
  nickname: string;
  password: string;
  role: "admin" | "user";
  profile?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCredential {
  credential: string;
  password: string;
}

export interface UserRegisterForm {
  email: string;
  username: string;
  nickname: string;
  password: string;
}

export interface Authenticate {
  user: User;
  token: string;
}
