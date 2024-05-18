import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class bill_detailApiService extends ApiService {
    itemList(id:any): Promise<any> {
        return this.client.get(`${this.baseUrl}/${id}`);
    }
}
export const bill_detailApi = new bill_detailApiService({ baseUrl: "/Bill_Detaill" }, axiosInstance);