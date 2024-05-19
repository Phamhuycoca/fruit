import type { IBodyResponse, ItemsList } from "@/common/interfaces";
import { ApiService } from "@/plugins/axios/api";
import axiosInstance from "@/plugins/axios";

class dashboardApiService extends ApiService {
    storeDashboard(): Promise<any> {
        return this.client.get(`${this.baseUrl}/Store_Dashboard`);
    }
    billDashboard(): Promise<any> {
        return this.client.get(`${this.baseUrl}/Bill_Dashboard`);
    }
    totalsDashboard(): Promise<any> {
        return this.client.get(`${this.baseUrl}/Totals`);
    }
}
export const dashboardApi = new dashboardApiService({ baseUrl: "/Dashboard" }, axiosInstance);