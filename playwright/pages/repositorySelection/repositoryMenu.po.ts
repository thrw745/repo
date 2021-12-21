import { Page } from '@playwright/test';

export class RepositoryMenuPage {

    readonly page: Page;
    readonly locators = {
        code: '#code-tab',
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

    async clickIssues(): Promise<void> {
        await this.page.click(this.locators.issues);
    }
}
