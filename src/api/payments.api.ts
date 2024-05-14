import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class paymentsApiService extends ApiService {
  addToPayment(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}/AddToPayment`, data);
  }
  deleteToPayment(id:any): Promise<any> {
   return this.client.delete(`${this.baseUrl}/deleteToPayment/${id}`,);
  }
}
export const paymentsApi = new paymentsApiService({ baseUrl: "/Payments" }, axiosInstance);