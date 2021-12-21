import { Page } from '@playwright/test';

export class EditIssuePage {

    readonly page: Page;
    readonly locators = {
        titleEdit: '#issue_title',
        body:'textarea[name=\'issue[body]\']',
        submitNewIssue: '.btn-primary.btn >> text = New Issue',
        dotMenuButton:'.timeline-comment-actions.flex-shrink-0>.details-overlay.details-reset.position-relative.d-inline-block>summary.timeline-comment-action.Link--secondary.btn-link',
        dotMenuEdit: '.details-overlay.details-reset.position-relative.d-inline-block>details-menu.dropdown-menu-sw>button.js-comment-edit-button',
        
        updateIssueBodyButton: '.btn-primary.btn >> text = Update comment',
        deleteButton: '.discussion-sidebar-item.border-top-0.mt-0 >> text = Delete issue',
        confirmDeletion: '.btn.btn-danger.input-block.float-none >> text = Delete this issue', 
        editTitleButton: '.btn-sm.js-details-target >> text = Edit',
        saveTitleButton: '.btn.mr-2 >> text = Save',
        nonEditableTitle: 'h1.gh-header-title>.js-issue-title.markdown-title',
        nonEditableBody: 'table.d-block>.d-block>tr>td.d-block.js-comment-body>p',
        deleteNotificationBody: '.anim-fade-in>div.Box-body',
        deleteNotificationText: '.mt-4',

        assigneesSelectMenu: 'assignees-select-menu',
        assigneeFilterField:'#assignee-filter-field',
        assigneeSelectMenuList:'#assignees-select-menu>.select-menu-modal>.hx_rsm-content.hx_rsm-content>.select-menu-list',

        labelsSelectMenu: 'labels-select-menu',
        labelFilterField: '#label-filter-field',
        labelsSelectMenuList:'#labels-select-menu>.select-menu-modal>.hx_rsm-content>.select-menu-list',
        
        projectsSelectMenu: 'projects-select-menu',
        //projectSelectMenuList:'#projects-select-menu>.select-menu-modal>.hx_rsm-content.hx_rsm-content>.select-menu-list'

    } 

    constructor(page: Page) {
        this.page = page;
    }

    async clickDotMenu(): Promise<void> {
        await this.page.click(this.locators.dotMenuButton);
    }

    async clickDotMenuEdit(): Promise<void> {
        await this.page.click(this.locators.dotMenuEdit);      
    }
    
    async clickEditButton(): Promise<void> {
        await this.page.click(this.locators.editTitleButton);
    }

    async clickSaveButton(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('/show_partial?partial=issues%2Ftitle&sticky=true') && resp.status() === 200),
            await this.page.click(this.locators.saveTitleButton)
        ]);
    }
    async fillTitle(titleText: string): Promise<void>{
        await this.page.fill(this.locators.titleEdit, titleText);  
    }
    
    async editIssueTitle(titleText: string): Promise<void> {
        await this.clickEditButton();
        await this.fillTitle(titleText);
        await this.clickSaveButton();
    }

    async editIssueBody(bodyText: string): Promise<void> {
        await this.clickDotMenu();
        await this.clickDotMenuEdit();
        await this.page.fill(this.locators.body, bodyText); 
        await this.clickEditBodyButton();
    }

    async clickEditBodyButton(): Promise<void>{
        await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('/body?variables%5BdeferredCommentActions%5D=true') && resp.status() === 200),
            await this.page.click(this.locators.updateIssueBodyButton)
        ]);
    }

    async clickDeleteButton(): Promise<void>{
        await this.page.click(this.locators.deleteButton);
    }
    async clickConfirmDeletionButton(): Promise<void>{
        await this.page.click(this.locators.confirmDeletion);
    }
    async getNonEditableTitle(): Promise<String | null>{
        return this.page.locator(this.locators.nonEditableTitle).textContent();
    }
    async getNonEditableBody(): Promise<String | null>{
        return this.page.locator(this.locators.nonEditableBody).textContent();
    }
    async getNotificationWindow(): Promise<any>{
        return this.page.locator(this.locators.deleteNotificationBody);
    }
    async getNotificationText(): Promise<String | null>{
        return this.page.locator(this.locators.deleteNotificationText).textContent();
    }

}
