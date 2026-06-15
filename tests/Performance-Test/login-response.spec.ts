import { test, expect } from "@playwright/test"
import Login from "../../POM/login-logout"

test("login page response time under 2 seconds", async ({ page }) => {

    const login = new Login(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    const start = Date.now()

    await login.loginUser()

    await expect(page).toHaveURL(/overview.htm/)

    const response = Date.now() - start

    console.log(`Login completed in ${response} ms`)

    expect(response).toBeLessThan(2000)

    await page.screenshot({ path: 'screenshots/Performance/login-performance.png' })

})