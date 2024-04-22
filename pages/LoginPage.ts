import {Page, Locator} from "playwright"

export class LoginPage{
    readonly page: Page;
    readonly Email: Locator;
    readonly Password: Locator;
    readonly Submit: Locator;
    readonly Signup: Locator;


    constructor(page: Page) {
        this.page = page;
        this.Email = page.getByPlaceholder('Email')
        this.Password = page.getByPlaceholder('Password')
        this.Submit = page.getByRole('button', { name: 'Submit' })
    }

    async navigateToLandingPage() {
        await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    }

    async login(email, password) {
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.Submit.click();
    }

}