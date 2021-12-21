import { Page } from '@playwright/test';

export class CreateNewIssue {

    readonly page: Page;
    readonly locators = {
        title: '#issue_title',
        body:'#issue_body',
        submitNewIssue: '.flex-items-center>.btn-primary.btn',
        
        assigneesSelectMenu: 'assignees-select-menu',
        assigneeFilterField:'#assignee-filter-field',
        assigneeSelectMenuList:'#assignees-select-menu>.select-menu-modal>.hx_rsm-content.hx_rsm-content>.select-menu-list',

        labelsSelectMenu: 'labels-select-menu',
        labelFilterField: '#label-filter-field',
        labelsSelectMenuList:'#labels-select-menu>.select-menu-modal>.hx_rsm-content>.select-menu-list',

    } 

    constructor(page: Page) {
        this.page = page;
    }

    async enterTitle(title: string): Promise<void> {
        await this.page.fill(this.locators.title, title);
    }
    async modifyTitle(title: string): Promise<void> {
        await this.page.locator(this.locators.title).selectText();
        await this.enterTitle(title);
    }
    async enterBody(body: string): Promise<void> {
        await this.page.fill(this.locators.body, body);
    }
    async modifyBody(body: string): Promise<void> {
        await this.page.locator(this.locators.body).selectText();
        await this.enterBody(body);
        
    }
    async clickSubmitNewIssue(): Promise<void> {
        await this.page.click(this.locators.submitNewIssue);
    }

    async getSubmitNewIssue(): Promise<any>{
        return  this.page.locator(this.locators.submitNewIssue);
    }
}
