import { test, expect } from "@playwright/test"
import Registration from "../../POM/registration"

test('Registration with Existing Username',async({page})=>{

    const registration=new Registration(page)

    await page.goto('https://parabank.parasoft.com/parabank/index.htm')

    await registration.navigateToRegister()

    await registration.invalidreg()

    await expect(page.getByRole('cell',{ name:'This username already exists.'})).toContainText('This username already exists.')

    await page.screenshot({path:`screenshots/NEG/TC-NEG-02-invalidRegistration.png`})

})