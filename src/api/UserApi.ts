import { retry } from './decorators/retry';

export class UserApi extends BaseApiTest {
  @retry(3)
  async getUserProfile(token: string) {
    return this.request
      .get('/users/profile')
      .set(this.getHeaders(token))
      .expect(200);
  }
} 