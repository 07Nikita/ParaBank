import { test, expect } from "@playwright/test"
import Login from "../../POM/login-logout"

test("login", async ({ page }) => {
    
    const login = new Login(page)   

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
    
    await login.loginUser()

    await page.screenshot({path:'screenshots/UI/login.png'})

})
