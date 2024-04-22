import { faker } from "@faker-js/faker";
import {Page, Locator} from "playwright"

export class AddContactPage{
    readonly page: Page;
    readonly FirstName: Locator;
    readonly LastName: Locator;
    readonly DOB: Locator;
    readonly Email: Locator;
    readonly Phone: Locator;
    readonly StreetAddress1: Locator;
    readonly StreetAddress2: Locator;
    readonly City: Locator;
    readonly StateOrProvince: Locator;
    readonly PostalCode: Locator;
    readonly Country: Locator;
    readonly Submit: Locator;
    readonly Cancel: Locator;


    constructor(page: Page) {
        this.page = page;
        this.FirstName=page.getByPlaceholder('First Name')
        this.LastName=page.getByPlaceholder('Last Name')
        this.DOB=page.getByPlaceholder('yyyy-MM-dd')
        this.Email=page.getByPlaceholder('example@email.com')
        this.Phone=page.getByPlaceholder('8005551234')
        this.StreetAddress1=page.getByPlaceholder('Address 1')
        this.StreetAddress2=page.getByPlaceholder('Address 2')
        this.City=page.getByPlaceholder('City')
        this.StateOrProvince=page.getByPlaceholder('State or Province')
        this.PostalCode=page.getByPlaceholder('Postal Code')
        this.Country=page.getByPlaceholder('Country')
        this.Submit=page.getByRole('button', { name: 'Submit' })
        this.Cancel=page.getByRole('button', { name: 'Cancel' })
    }

    async addAContact(firstname: string, lastname: string, dob: string, email:string, phone:string, streetaddress1: string, streetAddress2: string, city: string, statorprovince: string, postalcode:string, country: string) {
        await this.FirstName.fill(firstname)
        await this.LastName.fill(lastname)
        await this.DOB.fill(dob)
        await this.Email.fill(email)
        await this.Phone.fill(phone)
        await this.StreetAddress1.fill(streetaddress1)
        await this.StreetAddress2.fill(streetAddress2)
        await this.City.fill(city)
        await this.StateOrProvince.fill(statorprovince)
        await this.PostalCode.fill(postalcode)
        await this.Country.fill(country)
        await this.Submit.click(); 
        await this.page.waitForLoadState("networkidle");
    }

}