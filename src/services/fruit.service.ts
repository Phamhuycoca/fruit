
import { fruitApi } from "@/api/fruit.api";
import { DEFAULT_COMMON_LIST_QUERY, DEFAULT_COMMON_LIST_QUERY_PRODUCTS } from "@/common/constants";

import { showErrors } from "@/common/helpers";
export const useFruit = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchFruits = async () => {
    try {
      const res = await fruitApi._getList<any>(query);
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
  const searchFruits = async () => {
    try {
      const res = await fruitApi._getList<any>(query);
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
  const createFruit = async (data: any) => {
    try {
      return await fruitApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } 
  };

  const updateFruit=async(data:any,id:any)=>{
    try{
      return await fruitApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }
  };

  const getFruit=async(id:any)=>{
    try{
      return await fruitApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  const deleteFruit=async(id:any)=>{
    try{
      return await fruitApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }
  };

  const fetchGetAllProducts = async () => {
    try {
      const res = await fruitApi.getAllProducts(DEFAULT_COMMON_LIST_QUERY_PRODUCTS);
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
 
  const searchGetAllProducts = async () => {
    try {
      const res = await fruitApi.getAllProducts(DEFAULT_COMMON_LIST_QUERY_PRODUCTS);
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

  const fetchProductByStore = async (id:any) => {
    try {
      const res = await fruitApi.productByStore(DEFAULT_COMMON_LIST_QUERY_PRODUCTS,id);
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
 
  const searchProductByStore = async (id:any) => {
    try {
      const res = await fruitApi.productByStore(DEFAULT_COMMON_LIST_QUERY_PRODUCTS,id);
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
    createFruit,
    updateFruit,
    deleteFruit,
    fetchFruits,
    searchFruits,
    getFruit,
    fetchGetAllProducts,
    searchGetAllProducts,
    fetchProductByStore,
    searchProductByStore
  };
};