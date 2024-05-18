import { bill_detailApi } from "@/api/bill_detail";
export const useBill_Detail = () => {
  
  const getBill_Detaill=async(id:any)=>{
    try{
      return await bill_detailApi.itemList(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

 
  return {
    getBill_Detaill
  };
};