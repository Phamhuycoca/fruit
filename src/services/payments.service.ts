import { paymentsApi } from "@/api/payments.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/constants";

import { showErrors } from "@/common/helpers";
import { ref } from "vue";
export const usePayments = () => {
  const query = DEFAULT_COMMON_LIST_QUERY;

const addToPayment=async(data:any)=>{
    try {
        return await paymentsApi.addToPayment(data);
      } catch (error) {
        console.error("Error addToPayment:", error);
      } 
};
const fetchCartItems = async () => {
  try {
    const res = await paymentsApi._getList<any>(query);
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
const deleteToPayment=async(id:any)=>{
  try {
      return await paymentsApi.deleteToPayment(id);
    } catch (error) {
      console.error("Error deleteToPayment:", error);
    } 
};
  return {
    addToPayment,
    fetchCartItems,
    deleteToPayment
  };
};