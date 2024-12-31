import axios, { AxiosInstance } from 'axios';
import { config } from '../../config/config';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async get(url: string) {
    return await this.client.get(url);
  }

  async post(url: string, data: any) {
    return await this.client.post(url, data);
  }
} 