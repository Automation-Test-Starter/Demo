export const config = {
  runner: 'local',
  framework: 'mocha',
  reporters: ['spec', ['allure', {
    outputDir: 'reports/mobile'
  }]],
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:app': process.env.MOBILE_APP_PATH
  }],
  services: ['appium'],
  specs: [
    './tests/mobile/e2e/**/*.ts'
  ]
}; 