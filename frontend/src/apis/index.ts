import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_SAVEMYTASK_BASE_URL;

export const userApi = axios.create({
  baseURL: `${apiBaseUrl}/user`
});

export const taskApi = axios.create({
  baseURL: `${apiBaseUrl}/task`
});

export const authenticationApi = axios.create({
  baseURL: `${apiBaseUrl}/authentication`
});
