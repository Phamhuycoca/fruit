import { cartApi } from "@/api/cart.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";

import { showErrors } from "@/common/helpers";
export const useCart = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchCart = async () => {
    try {
      const res = await cartApi._getList<any>(query);
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
  const searchCart = async () => {
    try {
      const res = await cartApi._getList<any>(query);
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
  const createCart = async (data: any) => {
    try {
      return await cartApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } 
  };

  const updateCart=async(data:any,id:any)=>{
    try{
      return await cartApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }
  };

  const getCart=async(id:any)=>{
    try{
      return await cartApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  const deleteCart=async(id:any)=>{
    try{
      return await cartApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }
  };

  const tanggiamCart=async(data:any)=>{
    try{
      return await cartApi.tanggiamCart(data);
    }catch (error) {
      console.error("Error tanggiamCart:", error);
    }
  };
 
  return {
    query,
    fetchCart,
    searchCart,
    createCart,
    updateCart,
    getCart,
    deleteCart,
    tanggiamCart
  };
};