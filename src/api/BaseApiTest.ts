import request from 'supertest';
import { Config } from '@/common/config';

export class BaseApiTest {
  protected request: request.SuperTest<request.Test>;

  constructor() {
    this.request = request(Config.API_BASE_URL);
  }

  protected getHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
} 