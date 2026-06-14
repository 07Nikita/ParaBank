import {Locator,Page} from "@playwright/test"
import testData from "../data/data.json"

class Login {

    page:Page
    username:Locator
    password:Locator
    loginBtn:Locator

    constructor(page:Page) {
        this.page=page
        this.username=page.locator('[name="username"]')
        this.password=page.locator('input[name="password"]')
        this.loginBtn=page.locator('[type="submit"]')
    }

    async loginUser() {
        await this.username.fill("john")
        await this.password.fill("demo")
        await this.loginBtn.click()
    }

    async logoutUser() {
        await this.page.getByRole('link',{name:'Log Out'}).click()
    }

    async loginInvalidUser() {
    await this.username.fill(testData.invalidu)
    await this.password.fill(testData.invalidp)
    await this.loginBtn.click()
}
}

export default Login