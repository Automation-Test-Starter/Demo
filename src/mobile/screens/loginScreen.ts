import { remote } from 'webdriverio';

export class LoginScreen {
  private driver: WebdriverIO.Browser;

  constructor(driver: WebdriverIO.Browser) {
    this.driver = driver;
  }

  async login(username: string, password: string) {
    const usernameField = await this.driver.$('~username');
    const passwordField = await this.driver.$('~password');
    const loginButton = await this.driver.$('~loginButton');

    await usernameField.setValue(username);
    await passwordField.setValue(password);
    await loginButton.click();
  }
} 