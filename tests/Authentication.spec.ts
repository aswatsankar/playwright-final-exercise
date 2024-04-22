import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContactDetailsPage } from '../pages/ContactDetailsPage';
import { ContactListPage } from '../pages/ContactListPage';

const USER_STORAGE_STATE_PATH = ".auth/user.json";

setup('Login and store user auth', async ({ request}) => {
  const apiUrl = process.env.URL + '/users/login';
  console.log('API URL:', apiUrl); // Log constructed URL
  const userAuth = await request.post(apiUrl, {
    data: { "email": 'Sankara.narayanan@landservices.com.au', "password": process.env.PASSWORD }
  });
await expect(userAuth.status()).toEqual(200);
await request.storageState({path: USER_STORAGE_STATE_PATH});


 // To authenticate through UI mode 

/* const loginPage = new LoginPage(page);
  const contactlistPage = new ContactListPage(page);

  await loginPage.navigateToLandingPage();
  await loginPage.login("sankara.narayanan@landservices.com.au", process.env.PASSWORD);
  await expect(contactlistPage.Logout).toHaveText('Logout', { timeout: 20000 })
  await page.context().storageState({ path: USER_STORAGE_STATE_PATH });
  */
});


