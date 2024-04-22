
import { test, expect } from '@playwright/test';
import { ContactDetailsPage } from '../pages/ContactDetailsPage';
import { ContactListPage } from '../pages/ContactListPage'
import { AddContactPage } from '../pages/AddContactPage';
import { faker } from '@faker-js/faker';
import { EditContactPage } from '../pages/EditContactPage';


test.describe("ContactListFinalTest", async () => {
  let firstName: string;
  let lastName: string;
  let birthDate: string;
  let email: string;
  let phone: string;
  let streetaddress1: string;
  let streetaddress2: string;
  let city: string;
  let state: string;
  let zipCode: string;
  let country: string;

  test.beforeEach("adding pre-requisite by creating new contact", async ({ page }) => {

    const contactlistPage = new ContactListPage(page);
    const addContactPage = new AddContactPage(page);

    await page.goto(process.env.URL + '/contactList');
    await contactlistPage.navigateToAddaNewContactPage();

    // Save the details of the contact to be added
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    birthDate = "1992-08-04";
    email = faker.internet.email();
    phone = "0476916004";
    streetaddress1 = faker.location.streetAddress();
    streetaddress2 = faker.location.secondaryAddress();
    city = faker.location.city();
    state = faker.location.state();
    zipCode = faker.location.zipCode();
    country = faker.location.country();

    // Add a contact
    await addContactPage.addAContact(firstName, lastName, birthDate, email, phone, streetaddress1, streetaddress2, city, state, zipCode, country);

  });

  test("Verify the New contact has been added successfully", async ({ page }) => {

    // Construct the expected contact details as a map
    const expectedContactDetails = new Map([
      ['name', firstName + " " + lastName],
      ['birthdate', birthDate],
      ['email', email],
      ['phone', phone],
      ['address', streetaddress1 + " " + streetaddress2],
      ['city_state_postcode', city + " " + state + " " + zipCode],
      ['country', country]
    ]);

    console.log(expectedContactDetails.get('email'));

    // Get all the rows in the contact table
    const rows1 = await page.$$eval('.contactTableBodyRow', (rows) => rows.map((row) => row.textContent));

    // Get all the rows in the contact table
    const rows2 = page.locator('.contactTableBodyRow');
    const texts = await rows2.evaluateAll(
      list => list.map(element => element.textContent)
    );

    // validate the content created 
    texts.forEach((text) => {
      console.log(text);
      expect(text).toContain(expectedContactDetails.get('name') ?? '');
      expect(text).toContain(expectedContactDetails.get('birthdate') ?? '');
      expect(text).toContain(expectedContactDetails.get('email') ?? '');
      expect(text).toContain(expectedContactDetails.get('phone') ?? '');
      expect(text).toContain(expectedContactDetails.get('address') ?? '');
      expect(text).toContain(expectedContactDetails.get('city_state_postcode') ?? '');
      expect(text).toContain(expectedContactDetails.get('country') ?? '');
    });
  });

  test("Edit a new contact", async ({ page }) => {

    const expectedContactDetails = new Map([
      ['name', firstName + " " + lastName],
      ['birthdate', birthDate],
      ['email', email],
      ['phone', phone],
      ['address', streetaddress1 + " " + streetaddress2],
      ['city_state_postcode', city + " " + state + " " + zipCode],
      ['country', country]
    ]);
  
    // Get all the rows in the contact table
    const rows = page.locator('.contactTableBodyRow');
    const texts = await rows.evaluateAll(
      list => list.map(element => element.textContent)
    );
  
    // Find the row with the expected name
    const foundRow = texts.findIndex(text => text.includes(expectedContactDetails.get('name')));
  
    // Click on the row with the expected name
    await rows.nth(foundRow).click();

    const contactDetailsPage = new ContactDetailsPage(page);
    const editContactPage = new EditContactPage(page);

    await contactDetailsPage.navigateToEditContactList();

    // Edit the first name
    const newFirstName = "Edited";
    await editContactPage.EditFirstName(newFirstName);

    // Contact Details page 
    await expect(contactDetailsPage.FirstName).toHaveText(newFirstName);

  });

  test("Delete a new contact", async ({ page }) => {

    const expectedContactDetails = new Map([
      ['name', firstName + " " + lastName],
      ['birthdate', birthDate],
      ['email', email],
      ['phone', phone],
      ['address', streetaddress1 + " " + streetaddress2],
      ['city_state_postcode', city + " " + state + " " + zipCode],
      ['country', country]
    ]);
  
    // Get all the rows in the contact table
    const rows = page.locator('.contactTableBodyRow');
    const texts = await rows.evaluateAll(
      list => list.map(element => element.textContent)
    );
  
    // Find the row with the expected name
    const foundRow = texts.findIndex(text => text.includes(expectedContactDetails.get('name')));
  
    // Click on the row with the expected name
    await rows.nth(foundRow).click();

    const contactDetailsPage = new ContactDetailsPage(page);
    await contactDetailsPage.DeleteContact()

  })
  
  test.afterAll("Logout from the application", async ({ browser }) => {
    const context = await browser.newContext(); // Create a new context
    const page = await context.newPage(); // Create a new page in the context
    const contactListPage = new ContactListPage(page);
    
    await page.goto(process.env.URL + '/contactList');
    await contactListPage.logout();
    await context.close(); // Close the context to clean up resources
  });
  

});



