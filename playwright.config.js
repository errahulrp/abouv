// playwright.config.js
module.exports = {
  timeout: 60000, 
  retries: 0,
  use: {
      headless: false,
      baseURL: 'https://app.abouv.com',
      browserName: 'chromium',
      screenshot: 'on',
      video: 'retain-on-failure',
  },
  reporter: [
      ['list'], // Displays test results in the console
      ['html', { outputFolder: 'test-results', reportName: 'report.html' }] // Generates an HTML report
  ],
};
