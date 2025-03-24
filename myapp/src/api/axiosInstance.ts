// src/api/axiosInstance.ts
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

export const useAxios = () => {
  const { accessToken, refreshToken } = useAuth();

  const instance = axios.create();

  instance.interceptors.request.use(
    async config => {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    err => Promise.reject(err)
  );

  instance.interceptors.response.use(
    res => res,
    async err => {
      const originalRequest = err.config;
      if (err.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
      return Promise.reject(err);
    }
  );

  return instance;
};
