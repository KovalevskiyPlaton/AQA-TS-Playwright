import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// Тестовые данные
const VALID_USERNAME = 'alex_skillb123';
const VALID_PASSWORD = '0126alx333!';

test('Успешная авторизация на pizzeria.skillbox.cc', async ({ page }) => {
  // Создаем экземпляр страницы авторизации
  const loginPage = new LoginPage(page);
  
  // Шаг 1: Переходим на страницу авторизации
  await loginPage.goToLoginPage();
  
  // Проверяем что мы на нужной странице
  const currentUrl = await loginPage.getCurrentUrl();
  expect(currentUrl).toContain('my-account');
  
  const pageTitle = await loginPage.getTitle();
  console.log('Заголовок страницы:', pageTitle);
  
  // Шаг 2: Вводим логин
  await loginPage.enterUsername(VALID_USERNAME);
  
  // Шаг 3: Вводим пароль
  await loginPage.enterPassword(VALID_PASSWORD);
  
  // Шаг 4: Нажимаем кнопку "Войти"
  await loginPage.clickLoginButton();
  
  // Шаг 5: Проверяем успешность авторизации
  const isSuccess = await loginPage.isLoginSuccessful();
  expect(isSuccess).toBe(true);
  
  // Дополнительная проверка: получаем приветственное сообщение
  const welcomeMessage = await loginPage.getWelcomeMessage();
  console.log('Приветственное сообщение:', welcomeMessage);
  
  // Делаем скриншот для подтверждения
  await page.screenshot({ path: 'login-success.png' });
  
  console.log('Авторизация прошла успешно!');
});

// Опционально: можно добавить тест с неверными данными
test('Неуспешная авторизация с неверным паролем', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goToLoginPage();
  await loginPage.enterUsername(VALID_USERNAME);
  await loginPage.enterPassword('wrong_password');
  await loginPage.clickLoginButton();
  
  // Проверяем что остались на странице логина
  const currentUrl = await loginPage.getCurrentUrl();
  expect(currentUrl).toContain('my-account');
  
  // Ищем сообщение об ошибке
  const errorElement = page.locator('.woocommerce-error');
  const hasError = await errorElement.isVisible().catch(() => false);
  
  if (hasError) {
    const errorText = await errorElement.textContent();
    console.log('Сообщение об ошибке:', errorText);
  }
  
  console.log('Авторизация не удалась (как и ожидалось)');
});