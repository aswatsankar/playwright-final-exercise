import { Page, Locator } from "playwright"

export class ContactListPage {
    readonly page: Page;
    readonly Add_a_New_Contact: Locator;
    readonly Logout: Locator;


    constructor(page: Page) {
        this.page = page;
        this.Add_a_New_Contact = page.getByRole('button', { name: 'Add a New Contact' })
        this.Logout = page.getByRole('button', { name: 'Logout' })
    }

    async navigateToAddaNewContactPage() {
        await this.Add_a_New_Contact.click();
        await this.page.waitForLoadState("networkidle");
    }

    async logout() {
        await this.Logout.click();
    }



}