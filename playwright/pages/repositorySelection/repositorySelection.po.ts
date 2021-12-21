import { Page } from '@playwright/test';

export class RepositorySelectionPage {

    readonly page: Page;
    readonly locators = {
        sideRepositoy: 'div#repos-container >> text = thrw745/repo',
    } 

    constructor(page: Page) {
        this.page = page;
    }

    //TODO could not find what request to wait for
    async clickRepository(name: string): Promise<void> {
        //await Promise.all([
            //this.page.waitForResponse(resp => resp.url().includes('dashboard/top_repositories?location=lefte') && resp.status() === 200),
            await this.page.click(this.locators.sideRepositoy);
            await this.page.waitForTimeout(1000);
        //]);       
    }
}
