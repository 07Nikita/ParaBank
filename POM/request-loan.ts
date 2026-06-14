import {Locator , Page} from "@playwright/test"
import testData from "../data/data.json"

class RequestLoan {

    page:Page
    requestLoanBtn:Locator
    loanAmount:Locator
    downPayment:Locator
    applyNowBtn:Locator

    constructor(page:Page) {

        this.page=page  
        this.requestLoanBtn=page.getByRole('link', { name: 'Request Loan' })
        this.loanAmount=page.locator('#amount')
        this.downPayment=page.locator('#downPayment')
        this.applyNowBtn=page.getByRole('button', { name: 'Apply Now' })
    }   

    async navigateToRequestLoan() {
        await this.requestLoanBtn.click()
    }   

    async applyForLoan() {
        await this.loanAmount.fill(testData.loanAmount)
        await this.downPayment.fill(testData.downPayment)
        await this.applyNowBtn.click()
    }
}

export default RequestLoan

