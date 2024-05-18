import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";

class billApiService extends ApiService {
  createData(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}/Pay`, data);
  }
  updateData(data: any, id: any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/${id}`, data);
  }
  getData(id: any): Promise<any> {
    return this.client.get(`${this.baseUrl}/${id}`);
  }
  deleteData(id: any): Promise<any> {
   return this.client.delete(`${this.baseUrl}/${id}`);
  }
  itemsStatus0(DEFAULT_COMMON_LIST_QUERY:any): Promise<any> {
    return this.client.get(`${this.baseUrl}/ItemsStatus0`,{
        params: DEFAULT_COMMON_LIST_QUERY
      });
   }
}
export const billApi = new billApiService({ baseUrl: "/Bill" }, axiosInstance);