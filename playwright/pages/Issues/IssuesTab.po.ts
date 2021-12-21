import { Page } from '@playwright/test';

export class IssuesTabPage {

    readonly page: Page;
    readonly locators = {
        newIssue: '.btn-primary >> text = New Issue',
        issuesListing:'.js-navigation-container.js-active-navigation-container >> text = ',
        issueContainer: '.js-navigation-container.js-active-navigation-container',
        issues:'#issues-tab',
        pullRequests:'#pull-requests-tab',
        actions:'#actions-tab',
        projects:'#projects-tab',
        wiki:'#wiki-tab',
        security:'#security-tab',
        insights:'#insights-tab',
        settings:'#settings-tab'
    } 

    constructor(page: Page) {
        this.page = page;
    }

    async clickNewIssues(): Promise<void> {
        await this.page.click(this.locators.newIssue);
    }

    async clickIssueWithName(name: string): Promise<any> {
        await this.page.click(this.locators.issuesListing+name);
    }

    //TODO Get container - could not grab the container array elements
    async getIssueContaier(): Promise<any>{

    }

}
