import type {  IBodyResponse } from '@/common/interfaces';
import { ApiService } from '@/plugins/axios/api';
import axiosInstance from '@/plugins/axios';
import type { IBodyLogin, ILoginResponse } from '../layouts/auth/interfaces';

class AuthApiService extends ApiService {
  login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return this.client.post(`${this.baseUrl}/Login`, body);
  }
  logout():Promise<any>{
    return this.client.post(`${this.baseUrl}/logout`,);
  }
}
export const authApi = new AuthApiService({ baseUrl: '/Auth' }, axiosInstance);