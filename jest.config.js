module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports',
      filename: 'report.html',
    }]
  ]
}; 