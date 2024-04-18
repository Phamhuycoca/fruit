import localStorageAuthService from '@/common/storages/authStorage';
import axios from 'axios';
import router from '@/router';
import { showWarningsNotification, showErrorNotification, showErrors } from '@/common/helpers';
import { HttpStatus, PageName } from '@/common/constants';

export const logout = (redirectToLogin = true) => {
  localStorageAuthService.resetAll();
  const currentPage = router.currentRoute;
  if (redirectToLogin && currentPage.value.name !== PageName.LOGIN_PAGE) {
    sessionStorage.setItem('redirect', currentPage.value.fullPath);
    router
      .push({ name: PageName.LOGIN_PAGE })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }
};

export const sendRefreshToken = async () => {
  try {
    const formData = new FormData();
    formData.append("refresh_token", localStorageAuthService.getRefeshToken());

    const response = await axios.post(
      `http://localhost:25874/api/Auth/Refresh_token`,
      formData,
      { 
        headers: {
          'Content-Type': 'application/json' 
        }
      }
    );

    if (response?.status === HttpStatus.OK) {
      const responseData = response.data?.data;
      localStorageAuthService.setAccessToken(responseData.accessToken);
      localStorageAuthService.setAccessTokenExpiredAt(responseData.accessTokenExpiration);
      localStorageAuthService.setRefeshToken(responseData.refreshToken);
      localStorageAuthService.setRefeshTokenExpiredAt(responseData.refreshTokenExpiration);
    } else {
      logout(true);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.errors !== undefined) {
        showErrors(error.response?.data.errors);
    }
    }
    logout(true);
  }
};