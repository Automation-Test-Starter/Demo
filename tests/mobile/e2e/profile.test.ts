import { ProfileScreen } from '@/mobile/screens/ProfileScreen';
import { SettingsScreen } from '@/mobile/screens/SettingsScreen';

describe('User Profile Tests', () => {
  let profileScreen: ProfileScreen;
  let settingsScreen: SettingsScreen;

  beforeAll(async () => {
    await driver.launchApp();
    profileScreen = new ProfileScreen(driver);
    settingsScreen = new SettingsScreen(driver);
  });

  it('should update user profile successfully', async () => {
    // 导航到个人资料页面
    await profileScreen.navigate();
    
    // 更新个人信息
    await profileScreen.updateProfile({
      nickname: 'Test User',
      bio: 'Test Bio',
      avatar: 'test-avatar.jpg'
    });
    
    // 验证更新
    expect(await profileScreen.getNickname()).toBe('Test User');
    expect(await profileScreen.getBio()).toBe('Test Bio');
  });

  it('should change app theme', async () => {
    // 进入设置页面
    await settingsScreen.navigate();
    
    // 切换主题
    await settingsScreen.toggleDarkMode();
    
    // 验证主题切换
    expect(await settingsScreen.isDarkModeEnabled()).toBeTruthy();
  });

  afterAll(async () => {
    await driver.closeApp();
  });
}); 