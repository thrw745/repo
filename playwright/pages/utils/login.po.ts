import { Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly locators = {
        usernameInput: '#login_field',
        passwordInput: '#password',
        sendButton: 'input.btn.btn-primary.btn-block.js-sign-in-button'
    } 

    constructor(page: Page) {
        this.page = page;
    }

    async enterUsername(username: string): Promise<void> {
        await this.page.fill(this.locators.usernameInput, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.locators.passwordInput, password);
    }
    
    async clickSendButton(): Promise<void> {
        await this.page.click(this.locators.sendButton);
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSendButton();
        await this.page.waitForLoadState();
    }
}
