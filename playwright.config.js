module.exports = {
  timeout: 60000,
  retries: 0,
  use: {
    headless: true,
    baseURL: 'https://app.abouv.com',
    browserName: 'chromium',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results', reportName: 'report.html' }]
  ],
};
