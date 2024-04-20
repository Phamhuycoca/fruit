import type { IUser } from "@/common/interfaces";

export type IBodyLogin = {
  email?: string;
  password?: string;
};

export type ILoginResponse = {
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken: string;
  refreshTokenExpiration:number;
  role:string;
};