export interface LoginCredentail {
  username: string;
  password: string;
}

export interface LoginResponce {
  msg: string;
  refreshToken: string;
  token: string;
}
