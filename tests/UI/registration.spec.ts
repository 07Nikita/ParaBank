import { test, expect } from "@playwright/test"
import Registration from "../../POM/registration"

test("registration", async ({ page }) => {
    
    const reg = new Registration(page)
    
    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
    
    await reg.navigateToRegister()

    await expect(page).toHaveURL(/register.htm/)
    
    await reg.registerUser()
    
    await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.')

    await page.screenshot({path:'screenshots/UI/registration.png'})

   
})