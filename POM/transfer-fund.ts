import {Locator,Page} from "@playwright/test"
import testData from "../data/data.json"

class transferFund {

    page:Page
    transferFundBtn:Locator
    fromAccount:Locator
    toAccount:Locator
    amount:Locator
    submitBtn:Locator

    constructor(page:Page) {

        this.page=page    
        this.transferFundBtn=page.getByRole('link',{name:'Transfer Funds'})
        this.fromAccount=page.locator('#fromAccountId')
        this.toAccount=page.locator('#toAccountId')
        this.amount=page.locator('#amount')
        this.submitBtn=page.getByRole('button',{name:'Transfer'})
    }   

    async transfer() {
        await this.transferFundBtn.click()
        await this.fromAccount.selectOption({index: 0})
        await this.toAccount.selectOption({index: 1})
        await this.amount.fill(testData.amount)
        await this.submitBtn.click()
    
    }       

    }       


export default transferFund