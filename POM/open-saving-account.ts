import {Locator,Page, expect} from "@playwright/test"
import data from "../data/data.json"

class openSavingAccount {

    page:Page
    openAccountBtn:Locator
    accountType:Locator
    submitBtn:Locator
    accNumber:Locator
    id:Locator

    constructor(page:Page) {

        this.page=page    
        this.openAccountBtn=page.getByRole('link',{name:'Open New Account'})  
        this.accountType=page.locator('#type')
        this.submitBtn=page.getByRole('button',{ name:'Open New Account'})
        this.accNumber=page.locator('#newAccountId')
        this.id=page.locator('#fromAccountId')
    }   

    async OpenAccount() {
        await this.openAccountBtn.click()
        await this.accountType.selectOption('SAVINGS')
        await expect(this.id).toBeVisible( )
        await expect(this.id).not.toHaveValue('') 
        await this.submitBtn.click()
        await expect(this.accNumber).toBeVisible()    
        let accNum=await this.accNumber.textContent()
        console.log("NEW savings Account Number: " + accNum)
        

    }       
}

export default openSavingAccount