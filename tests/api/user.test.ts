import { UserApi } from '@/api/UserApi';
import { ApiResponse, LoginResponse, UserResponse } from '@/api/types/responses';

describe('User API Tests', () => {
  const userApi = new UserApi();
  let authToken: string;

  beforeAll(async () => {
    // 测试前登录获取 token
    const response = await userApi.login('admin', 'password123');
    const loginResponse = response.body as ApiResponse<LoginResponse>;
    authToken = loginResponse.data.token;
  });

  describe('User Profile', () => {
    it('should get user profile successfully', async () => {
      const response = await userApi.getUserProfile(authToken);
      const profileResponse = response.body as ApiResponse<UserResponse>;
      
      expect(response.status).toBe(200);
      expect(profileResponse.code).toBe(0);
      expect(profileResponse.data.username).toBeDefined();
      expect(profileResponse.data.email).toBeDefined();
    });

    it('should fail to get profile with invalid token', async () => {
      await userApi.getUserProfile('invalid-token')
        .expect(401);
    });
  });

  describe('User Creation', () => {
    it('should create new user successfully', async () => {
      const newUser = {
        username: `test_user_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      };

      const response = await userApi.createUser(newUser, authToken);
      const createResponse = response.body as ApiResponse<UserResponse>;

      expect(response.status).toBe(201);
      expect(createResponse.data.username).toBe(newUser.username);
      expect(createResponse.data.email).toBe(newUser.email);
    });

    it('should fail to create user with existing username', async () => {
      const existingUser = {
        username: 'admin',
        email: 'new@example.com',
        password: 'password123'
      };

      await userApi.createUser(existingUser, authToken)
        .expect(400);
    });
  });
}); 