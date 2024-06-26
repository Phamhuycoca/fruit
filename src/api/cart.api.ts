import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class cartApiService extends ApiService {
  createData(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}`, data);
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
  tanggiamCart(data:any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/TangGiamCartItem`, data);
  }
}
export const cartApi = new cartApiService({ baseUrl: "/Cart" }, axiosInstance);