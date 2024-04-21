import { storeApi } from "@/api/store.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";

import { showErrors } from "@/common/helpers";
export const useStore = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchStores = async () => {
    try {
      const res = await storeApi._getList<any>(query);
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
  const searchStores = async () => {
    try {
      const res = await storeApi._getList<any>(query);
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
  const createStore = async (data: any) => {
    try {
      return await storeApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } 
  };

  const updateStore=async(data:any,id:any)=>{
    try{
      return await storeApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }
  };

  const getStore=async(id:any)=>{
    try{
      return await storeApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  const deleteStore=async(id:any)=>{
    try{
      return await storeApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }
  };

 
  return {
    query,
    createStore,
    updateStore,
    searchStores,
    fetchStores,
    getStore,
    deleteStore
  };
};