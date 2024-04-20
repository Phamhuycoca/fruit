import { showErrors, showSuccessNotification } from "@/common/helpers";
import type { IBodyLogin } from "@/layouts/auth/interfaces"
import localStorageAuthService from "@/common/storages/authStorage";
import { computed } from "vue";
import dayjs from "dayjs";
import { authApi } from "@/api/auth.api";

export const useAuthService=()=>{
    let errors;

    const login =async(body: IBodyLogin)=>{
        const res = await authApi.login(body);
        if (res.success) {
            showSuccessNotification(res.message);
            localStorageAuthService.setAccessToken(res.data?.accessToken);
            localStorageAuthService.setAccessTokenExpiredAt(res.data?.accessTokenExpiration);
            localStorageAuthService.setRefeshToken(res.data?.refreshToken);
            localStorageAuthService.setRefeshTokenExpiredAt(res.data?.refreshTokenExpiration);
            localStorageAuthService.setRole(res.data?.role);
        } else {
            if (res.errors !== undefined) {
                showErrors(res.errors);
            }
        }
        return res;
    }
    
    const logout=async()=>{
        const res=await authApi.logout();
        if(res.success) {
            showErrors(res.message);
            localStorageAuthService.resetAll()
        }
        return res.success;
    };
    const isAuthenticated = computed(() => {
        const token = localStorageAuthService.getAccessToken();
        const expiredAt = localStorageAuthService.getAccessTokenExpiredAt();
        return Boolean(token && expiredAt && !dayjs(dayjs(expiredAt)).isBefore());
      });
      const hasToken = computed(() => {
        return !!localStorageAuthService.getAccessToken();
      });
    return{
        login,
        isAuthenticated,
        hasToken,
        logout
    }
}