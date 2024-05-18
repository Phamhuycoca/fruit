import { billApi } from "@/api/bill.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";

import { showErrors } from "@/common/helpers";
export const useBill = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchBills = async () => {
    try {
      const res = await billApi._getList<any>(query);
      if (res.errors !== undefined) {
        showErrors(res.errors);
    }
      if (res.success) {
        return {
          items: res.items,
          totalItems: res.totalItems,
        };
      }
      return {
        items: [],
        totalItems: 0,
      };
    } catch (error) {
      console.error("Error Fetching:", error);
    } 
  };

  const searchBills = async () => {
    try {
      const res = await billApi._getList<any>(query);
      if (res.success) {
        return {
          items: res.items,
          totalItems: res.totalItems,
        };
      }
      return {
        items: [],
        totalItems: 0,
      };
    } catch (error) {
      console.error("Error Search:", error);
    } 
  };

  const createBill = async (data: any) => {
    try {
      return await billApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } 
  };

  const updateBill=async(data:any,id:any)=>{
    try{
      return await billApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }
  };

  const getBill=async(id:any)=>{
    try{
      return await billApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  const deleteBill=async(id:any)=>{
    try{
      return await billApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }
  };

  const fetchitemsStatus0 = async () => {
    try {
      const res = await billApi.itemsStatus0(query);
      if (res.errors !== undefined) {
        showErrors(res.errors);
    }
      if (res.success) {
        return {
          items: res.items,
          totalItems: res.totalItems,
        };
      }
      return {
        items: [],
        totalItems: 0,
      };
    } catch (error) {
      console.error("Error Fetching:", error);
    } 
  };

  return {
    query,
    fetchBills,
    createBill,
    updateBill,
    deleteBill,
    getBill,
    searchBills,
    fetchitemsStatus0
  };
};