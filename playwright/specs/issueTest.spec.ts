import test, { expect} from "../pages/utils/base.po";
import * as user from '../data/login.cred.json';
import { CreateNewIssue } from "../pages/Issues/createNewIssue.po";
import { IssuesTabPage } from "../pages/Issues/IssuesTab.po";
import { EditIssuePage } from "../pages/Issues/editIssue.po";

const validateSubmitDisabled = async (createNewIssue: CreateNewIssue) => {
    expect(await createNewIssue.getSubmitNewIssue()).toBeDisabled()
}

const validateUpdateTitleAndBody = async (editIssuePage: EditIssuePage, title: string, body:string) => {
    expect(await editIssuePage.getNonEditableTitle()).toEqual(title);
    expect(await editIssuePage.getNonEditableBody()).toEqual(body);
}

const validateDeleteNotification = async (editIssuePage: EditIssuePage) => {
    expect(await editIssuePage.getNotificationWindow()).toBeVisible();
    expect(await editIssuePage.getNotificationText()).toContain("Are you sure you want to delete this issue?");
}

//TODO issuesTabPage.getIssueCOntainer() is not implemented
const validateIssueInList = async (issuesTabPage: IssuesTabPage, name: string) => {
    //expect(await issuesTabPage.getIssueContaier()).toContain(name)
}
test.describe('Test Issues in GitHub: ', () => {    

    let title: string;
    let body: string;

    test.beforeEach(async ({ loginPage, page, baseURL, repositorySelectionPage, repositoryMenuPage, utils }) => {
        await page.goto(baseURL);
        await loginPage.login(user.username, user.password);
        await repositorySelectionPage.clickRepository("CapriSix/Xray-Playwright");
        await repositoryMenuPage.clickIssues();
        title=utils.getRandomString();
        body=utils.getRandomString();
    });    

    test('Create Issue and update it ', async ({ issuesTabPage, editIssuePage, createNewIssue, repositoryMenuPage }) => {
            
            await issuesTabPage.clickNewIssues();
            await validateSubmitDisabled(createNewIssue);

            await createNewIssue.enterTitle(title);
            await createNewIssue.clickSubmitNewIssue();
            await repositoryMenuPage.clickIssues();
            await validateIssueInList(issuesTabPage, title);

            await issuesTabPage.clickIssueWithName(title);
            await editIssuePage.page.waitForLoadState();

            title = "Update " + title;
            await editIssuePage.editIssueTitle(title);
            await editIssuePage.editIssueBody(body);
            await validateUpdateTitleAndBody(editIssuePage, title, body);

            await repositoryMenuPage.clickIssues();
            await issuesTabPage.page.waitForLoadState();
            await validateIssueInList(issuesTabPage, title);

            await issuesTabPage.clickIssueWithName(title);
            await editIssuePage.clickDeleteButton();
            await validateDeleteNotification(editIssuePage);

            await editIssuePage.clickConfirmDeletionButton();
    });

});