import axios, { AxiosInstance } from 'axios';

export async function apiAdapter(url: string): Promise<AxiosInstance> {
  return axios.create({
    baseURL: url,
  });
}
