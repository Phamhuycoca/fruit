import type { AxiosRequestConfig } from 'axios';
import dayjs from '@/plugins/dayjs';

export const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Timezone': dayjs().format('Z'),
    'X-Timezone-Name': dayjs.tz.guess(),
  },
  baseURL: "http://localhost:63133/api/",
  responseType: 'json',
};