# 自动化测试框架

一个集成了 API、Web UI 和移动端自动化测试的完整测试框架。

## 技术栈

- 语言：TypeScript
- API 测试：Supertest + Jest
- Web UI 测试：Playwright
- 移动端测试：Appium + WebdriverIO
- 测试框架：Jest

## 项目结构

```plaintext
test-automation-framework/
├── src/
│   ├── api/          # API 测试相关代码
│   ├── web/          # Web UI 测试相关代码
│   ├── mobile/       # 移动端测试相关代码
│   ├── common/       # 通用工具和配置
│   └── data/         # 测试数据
├── tests/            # 测试用例
├── reports/          # 测试报告
└── README.md
```

## 安装

```bash
# 克隆项目
git clone <repository-url>
cd test-automation-framework

# 安装依赖
npm install

# 安装 Playwright 浏览器
npx playwright install

# 配置环境变量
cp .env.example .env
```

## 运行测试

```bash
# 运行所有测试
npm test

# 运行 API 测试
npm run test:api

# 运行 Web UI 测试
npm run test:web

# 运行移动端测试
npm run test:mobile

# 运行测试并生成覆盖率报告
npm run test:coverage
```

## 测试用例示例

### API 测试示例

```typescript
describe('User API Tests', () => {
  it('should login successfully', async () => {
    // 测试用例实现
  });
});
```

### Web UI 测试示例

```typescript
describe('Login Page Tests', () => {
  it('should login with valid credentials', async () => {
    // 测试用例实现
  });
});
```

### 移动端测试示例

```typescript
describe('Mobile Login Tests', () => {
  it('should login on mobile app', async () => {
    // 测试用例实现
  });
});
```

## 配置说明

### 环境变量配置

创建 `.env` 文件：

```plaintext
API_BASE_URL=http://localhost:3000
WEB_BASE_URL=http://localhost:8080
MOBILE_APP_PATH=/path/to/app.apk
```

### Jest 配置

jest.config.js 主要配置项：

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts']
}
```

## 开发指南

### 添加新的 API 测试

1. 在 `src/api/types` 中定义接口类型
2. 在 `src/api` 中创建新的 API 类
3. 在 `tests/api` 中添加测试用例

### 添加新的 Web UI 测试

1. 在 `src/web/pages` 中创建页面对象
2. 在 `src/web/components` 中创建可重用组件
3. 在 `tests/web` 中添加测试用例

### 添加新的移动端测试

1. 在 `src/mobile/screens` 中创建页面对象
2. 在 `src/mobile/components` 中创建可重用组件
3. 在 `tests/mobile` 中添加测试用例

## 最佳实践

1. 使用 Page Object 模式组织 UI 测试代码
2. 保持测试用例独立性
3. 使用环境变量管理配置
4. 实现测试数据清理机制
5. 添加详细的测试报告
6. 使用 CI/CD 集成测试

## 常见问题解决

### 1. 移动端测试环境配置

- 确保已安装 Appium 服务器
- 配置正确的移动设备或模拟器
- 设置正确的 APP 路径

```bash
npm install -g appium
appium driver install uiautomator2
```

### 2. 并发测试执行

在 jest.config.js 中配置：

```javascript
module.exports = {
  maxWorkers: 4,
  maxConcurrency: 2
}
```

### 3. 测试数据管理

- 使用工厂模式创建测试数据
- 实现测试数据清理机制
- 使用独立的测试数据库

### 4. 测试报告生成

```bash
# 生成 HTML 报告
npm run test:report

# 生成覆盖率报告
npm run test:coverage
```

## CI/CD 集成

### GitHub Actions 配置示例

```yaml
name: Test Automation

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交变更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 调试指南

### API 测试调试

```bash
# 使用 VS Code 调试配置
{
  "type": "node",
  "request": "launch",
  "name": "Debug API Tests",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--testPathPattern=tests/api"],
  "console": "integratedTerminal"
}
```

### Web UI 测试调试

```bash
# 开启 Playwright 调试模式
PWDEBUG=1 npm run test:web
```

### 移动端测试调试

```bash
# 开启 Appium 调试日志
APPIUM_LOG_LEVEL=debug npm run test:mobile
```

## 许可证

MIT