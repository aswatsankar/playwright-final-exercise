import {Page} from '@playwright/test';
import {LoginPage} from './LoginPage';
import {EditContactPage} from './EditContactPage';
import { ContactListPage } from './ContactListPage';
import { ContactDetailsPage } from './ContactDetailsPage';
import { AddContactPage} from './AddContactPage';


export class HerokuappPageManager{
    private readonly page: Page 
    private readonly loginPage: LoginPage
    private readonly editContactPage: EditContactPage
    private readonly contactListPage: ContactListPage
    private readonly contactDetailsPage: ContactDetailsPage
    private readonly addContactPage: AddContactPage

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.editContactPage = new EditContactPage(this.page)
        this.contactListPage = new ContactListPage(this.page)
        this.contactDetailsPage = new ContactDetailsPage(this.page)
        this.addContactPage = new AddContactPage(this.page)

    }

    LoginPage(){
        return this.loginPage
    }
    EditContactPage(){
        return this.editContactPage
    }
    ContactListPage(){
        return this.contactListPage
    }
    ContactDetailsPage(){
        return this.contactDetailsPage
    }
    AddContactPage(){
        return this.addContactPage
    }
}