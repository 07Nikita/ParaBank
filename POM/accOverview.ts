import {Locator, Page} from "@playwright/test"
import fs from "fs"

class accOverview { 

    page:Page
    accOverviewBtn:Locator
    accOverview:Locator
    from:Locator
    to:Locator
    totalBal:Locator
    


    constructor(page:Page) {

        this.page=page      
        this.accOverviewBtn=page.getByRole('link',{name:'Accounts Overview'})
        this.accOverview=page.locator('[id="accountTable"]')
        this.from=page.locator('//tbody/tr/td/a').first()
         this.to=page.locator('//tbody/tr/td/a').nth(1)
        this.totalBal=page.locator('//tr[td/b[text()="Total"]]/td[2]/b')
    }   

    async accountOverview() {
        await this.accOverviewBtn.click()
        await this.accOverview.waitFor({ state: 'visible' })                
    }  
    
    async collectData() {
        let total=await this.totalBal.textContent()
        console.log("Total Balance: " + total)
        const data=JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'))
        data.fromAcc =(await this.from.textContent())?.trim()
        data.toAcc=(await this.to.textContent())?.trim()
        fs.writeFileSync('./data/data.json',JSON.stringify(data, null, 2))
    }

    async getAccountBalance(accountId: string) {

         await this.page.locator(`//tr[td/a[text()="${accountId}"]]/td[2]`).waitFor({state:'visible'})

    const balance = await this.page.locator(`//tr[td/a[text()="${accountId}"]]/td[2]`).textContent()


    return parseFloat(balance!.replace('$', '').replace(',', ''))
}


async getTotalBalance() {

    const total = await this.totalBal.textContent()

    return parseFloat(total!.replace('$', '').replace(',', ''))
    
}
}

export default accOverview