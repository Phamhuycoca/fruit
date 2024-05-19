import { bill_detailApi } from "@/api/bill_detail";
import { dashboardApi } from "@/api/dashboard.api";
export const useDashboard = () => {
  
  const storeDashboard=async(id:any)=>{
    try{
      return await dashboardApi.storeDashboard();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  const billDashboard=async(id:any)=>{
    try{
      return await dashboardApi.billDashboard();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  const totalsDashboard=async()=>{
    try{
      return await dashboardApi.totalsDashboard();
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  return {
    storeDashboard,
    billDashboard,
    totalsDashboard
  };
};