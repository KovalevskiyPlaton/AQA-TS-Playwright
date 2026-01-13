import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Для ВСЕХ тестов
  use: {
    headless: false, // или false для запуска с GUI
  },
  
  // ИЛИ для конкретных проектов
  projects: [
    {
      name: 'Chromium',
      use: { 
        browserName: 'chromium',
        headless: false, // Chromium с GUI
      },
    },
    {
      name: 'Firefox',
      use: { 
        browserName: 'firefox',
        headless: true, // Firefox без GUI
      },
    },
  ],
});
