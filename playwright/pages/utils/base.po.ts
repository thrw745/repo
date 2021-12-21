import { test as base } from "@playwright/test";
import { LoginPage } from './login.po';
import { Utils } from './utils';
import { RepositorySelectionPage } from "../repositorySelection/repositorySelection.po";
import { RepositoryMenuPage } from "../repositorySelection/repositoryMenu.po";
import { IssuesTabPage } from "../Issues/IssuesTab.po";
import { CreateNewIssue } from "../Issues/createNewIssue.po";
import { EditIssuePage } from "../Issues/editIssue.po";


    type pages = {
    loginPage: LoginPage;
    utils: Utils;
    repositorySelectionPage: RepositorySelectionPage;
    repositoryMenuPage: RepositoryMenuPage;
    issuesTabPage: IssuesTabPage;
    createNewIssue:CreateNewIssue;
    editIssuePage: EditIssuePage;
}

const test = base.extend<pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    utils: async ({ }, use) => {
        await use(new Utils());
    },
    repositorySelectionPage: async ({page}, use) => {
        await use (new RepositorySelectionPage(page));
    },
    repositoryMenuPage: async ({page}, use) => {
        await use (new RepositoryMenuPage(page));
    },
    issuesTabPage: async ({page}, use) => {
        await use (new IssuesTabPage(page));
    },
    createNewIssue: async ({page}, use) => {
        await use (new CreateNewIssue(page));
    },
    editIssuePage: async ({page}, use) => {
        await use (new EditIssuePage(page));
    }
 });

export default test;
export const expect = test.expect;
export const describe = test.describe;


