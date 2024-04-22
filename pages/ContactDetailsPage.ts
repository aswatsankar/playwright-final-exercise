import { Page, Locator } from "playwright"

export class ContactDetailsPage {
    readonly page: Page;
    readonly Edit_contact: Locator;
    readonly Delete_contact: Locator;
    readonly ReturnTo_ContactList: Locator;
    readonly FirstName: Locator;


    constructor(page: Page) {
        this.page = page;
        this.Edit_contact = page.getByRole('button', { name: 'Edit Contact' })
        this.Delete_contact = page.getByRole('button', { name: 'Delete Contact' })
        this.ReturnTo_ContactList = page.getByRole('button', { name: 'Return to Contact List' })
        this.FirstName = page.locator('id=firstName')
    }

    async navigateToEditContactList() {
        await this.Edit_contact.click();
        await this.page.waitForLoadState("networkidle");
    }

    async DeleteContact() {
        {
            this.page.on('dialog', async dialog => {
                await dialog.accept();
            });

            return await this.Delete_contact.click()
        }

    }
}