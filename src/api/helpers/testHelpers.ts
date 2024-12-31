import { UserApi } from '../UserApi';

export async function getTestUserToken(
  username: string = 'testuser',
  password: string = 'password123'
): Promise<string> {
  const userApi = new UserApi();
  const response = await userApi.login(username, password);
  return response.body.data.token;
}

export function generateTestUser() {
  const timestamp = Date.now();
  return {
    username: `test_user_${timestamp}`,
    email: `test${timestamp}@example.com`,
    password: 'password123'
  };
} 