import {Locator,Page} from "@playwright/test"
import testData from "../data/data.json"
import fs from "fs"

class Registration {

    page:Page
    registerBtn:Locator
    fname:Locator
    lname:Locator
    address:Locator
    city:Locator
    state:Locator
    zip:Locator
    phone:Locator
    ssn:Locator
    username:Locator
    password:Locator
    confirmpassword:Locator
    submitBtn:Locator
    accid:Locator
    accOverviewBtn:Locator

    constructor(page:Page) {

        this.page=page
        this.registerBtn=page.getByRole('link',{name:'Register'})
        this.fname=page.locator('[id="customer.firstName"]')
        this.lname=page.locator('//input[@id="customer.lastName"]')   
        this.address=page.locator('input[id="customer.address.street"]')
        this.city=page.locator('#customer\\.address\\.city')
        this.state=page.locator('[id="customer.address.state"]')    
        this.zip=page.locator('[id="customer.address.zipCode"]')
        this.phone=page.locator('[id="customer.phoneNumber"]')
        this.ssn=page.locator('#customer\\.ssn')
        this.username=page.locator('#customer\\.username')
        this.password=page.locator('#customer\\.password')
        this.confirmpassword=page.locator('#repeatedPassword')
        this.submitBtn=page.getByRole('button',{name:'Register'})
        this.accOverviewBtn=page.getByRole('link',{name:'Accounts Overview'})
        this.accid=page.locator('//tbody/tr/td/a').first()
        
    }

    async navigateToRegister() {
        await this.registerBtn.click()
    }

    async registerUser() {
        const username = `nikita${Math.floor(Math.random() * 10000)}`
        await this.fname.fill(testData.firstName)
        await this.lname.fill(testData.lastName)
        await this.address.fill(testData.address)
        await this.city.fill(testData.city)
        await this.state.fill(testData.state)
        await this.zip.fill(testData.zip)
        await this.phone.fill(testData.phone)
        await this.ssn.fill(testData.ssn)
         await this.username.fill(username)
        // await this.username.fill(testData.rusername)
        await this.password.fill(testData.rpassword)
        await this.confirmpassword.fill(testData.rpassword)
        await this.submitBtn.click()
        
        
    }

    async registerUser2() {
        const username = `nikita${Math.floor(Math.random() * 10000)}`
        await this.fname.fill(testData.firstName)
        await this.lname.fill(testData.lastName)
        await this.address.fill(testData.address)
        await this.city.fill(testData.city)
        await this.state.fill(testData.state)
        await this.zip.fill(testData.zip)
        await this.phone.fill(testData.phone)
        await this.ssn.fill(testData.ssn)
        await this.username.fill(username)
        await this.password.fill(testData.rpassword)
        await this.confirmpassword.fill(testData.rpassword)
        await this.submitBtn.click()
        
        
    }

    async collectAccId() {
        await this.accOverviewBtn.click()
        await this.accid.waitFor({ state: 'visible' })
        const accountId = await this.accid.textContent()
        const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'))
        data.accountId = Number(accountId?.trim())
        fs.writeFileSync('./data/data.json',JSON.stringify(data, null, 2))
    console.log("Newly created account ID:", data.accountId)
    return accountId
}

    async invalidreg() {

    await this.fname.fill(testData.firstName)
    await this.lname.fill(testData.lastName)
    await this.address.fill(testData.address)
    await this.city.fill(testData.city)
    await this.state.fill(testData.state)
    await this.zip.fill(testData.zip)
    await this.phone.fill(testData.phone)
    await this.ssn.fill(testData.ssn)
    await this.username.fill(testData.existingUsername)
    await this.password.fill(testData.password)
    await this.confirmpassword.fill(testData.password)

    await this.submitBtn.click()
}

    }

export default Registration
