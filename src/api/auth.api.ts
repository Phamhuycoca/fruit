import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import type { IBodyLogin, ILoginResponse } from '../layouts/auth/interfaces';

class AuthApiService extends ApiService {
  login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return this.client.post(`${this.baseUrl}/Login`, body);
  }
  register(data:any): Promise<IBodyResponse<any>>{
    const formdata=new FormData();
    formdata.append('email',data.email);
    formdata.append('fullName',data.fullname);
    formdata.append('passWord',data.password);
    return this.client.post(`${this.baseUrl}/Register`, formdata);
  }
  logout():Promise<any>{
    return this.client.post(`${this.baseUrl}/logout`,);
  }
}
export const authApi = new AuthApiService({ baseUrl: '/Auth' }, axiosInstance);