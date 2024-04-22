import {Page, Locator} from "playwright"

export class EditContactPage{
    readonly page: Page;
    readonly FirstName: Locator;
    readonly Submit: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.FirstName = page.getByLabel('First Name:')
        this.Submit = page.getByRole('button', { name: 'Submit' })
    }

    async EditFirstName(firstname: string) {
        await this.FirstName.clear()
        await this.FirstName.fill(firstname)
        await this.Submit.click()
        await this.page.waitForLoadState("networkidle");
    }


}