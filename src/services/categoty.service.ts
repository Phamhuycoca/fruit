import { categoryApi } from "@/api/category.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";

import { showErrors } from "@/common/helpers";
export const useCategory = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;
  const fetchCategories = async () => {
    try {
      const res = await categoryApi._getList<any>(query);
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
  const searchCategories = async () => {
    try {
      const res = await categoryApi._getList<any>(query);
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
  const createCategory = async (data: any) => {
    try {
      return await categoryApi.createData(data);
    } catch (error) {
      console.error("Error Create:", error);
    } 
  };

  const updateCategory=async(data:any,id:any)=>{
    try{
      return await categoryApi.updateData(data,id);
    }catch (error) {
      console.error("Error Update:", error);
    }
  };

  const getCategory=async(id:any)=>{
    try{
      return await categoryApi.getData(id);
    }catch (error) {
      console.error("Error GetDetail:", error);
    }
  };

  const deleteCategory=async(id:any)=>{
    try{
      return await categoryApi.deleteData(id);
    }catch (error) {
      console.error("Error Delete:", error);
    }
  };

 
  return {
    query,
    createCategory,
    updateCategory,
    searchCategories,
    fetchCategories,
    getCategory,
    deleteCategory
  };
};