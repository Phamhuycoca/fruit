import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class fruitApiService extends ApiService {
  createData(data: any): Promise<any> {
    return this.client.post(`${this.baseUrl}`, data,{
        headers: { "Content-Type": "multipart/form-data" }
    });
  }
  updateData(data: any, id: any): Promise<any> {
    return this.client.patch(`${this.baseUrl}/${id}`, data,{
        headers: { "Content-Type": "multipart/form-data" },
    });
  }
  getData(id: any): Promise<any> {
    return this.client.get(`${this.baseUrl}/${id}`);
  }
  deleteData(id: any): Promise<any> {
   return this.client.delete(`${this.baseUrl}/${id}`);
  }
  getAllProducts(DEFAULT_COMMON_LIST_QUERY_PRODUCTS:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/GetAllProducts`, {
        params: DEFAULT_COMMON_LIST_QUERY_PRODUCTS
        }
    );    
  }
  productByStore(DEFAULT_COMMON_LIST_QUERY_PRODUCTS:any,id:any):Promise<any> {
    return this.client.get(`${this.baseUrl}/ProductByStore/${id}`, {
        params: DEFAULT_COMMON_LIST_QUERY_PRODUCTS
        }
    );
  }
}
export const fruitApi = new fruitApiService({ baseUrl: "/Fruit" }, axiosInstance);