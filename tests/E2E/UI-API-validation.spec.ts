import { test, expect } from "@playwright/test"
import Registration from "../../POM/registration"
import OpenCheckinAccount from "../../POM/open-checkin-account"
import Login from "../../POM/login-logout"
import data from "../../data/data.json"
let baseURL = "https://parabank.parasoft.com/parabank/services/bank"


test(" create account via ui and validate via api", async ({page,request}) => {
     //!UI
    const registration = new Registration(page)
    const openAccount = new OpenCheckinAccount(page)
    const login = new Login(page)

    await page.goto( "https://parabank.parasoft.com/parabank/index.htm")

    await registration.navigateToRegister()

    await registration.registerUser()

    await expect(page.getByText("Your account was created successfully")).toBeVisible()

    await page.screenshot({path: "screenshots/E2E/UI-API/1-registration.png"})

    // await registration.collectAccId()
    // const accountId = await registration.collectAccId()

    await page.screenshot({path: "screenshots/E2E/UI-API/2-overview.png"})

    await openAccount.OpenAccount()

    await expect(openAccount.accNumber).toBeVisible()

    const newAccountNumber=(await openAccount.accNumber.textContent())?.trim()

    await page.screenshot({path: "screenshots/E2E/UI-API/3-checkingAccount.png"})

    await login.logoutUser()

    await expect(page.getByRole("link", { name: "Register" })).toBeVisible()

    await page.screenshot({path: "screenshots/E2E/UI-API/4-logout.png"})

    //!API
     let res1 = await request.get(`${baseURL}/login/${data.username}/${data.password}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    console.log("Content-Type:")

    let body1 = await res1.json()

    const customerId = body1.id;
    
    let res = await request.get(`${baseURL}/customers/${customerId}/accounts`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    let body = await res.json()

    console.log(body)

    const accountExists = body.some(
    (account: any) => account.id === newAccountNumber
)


console.log(
    `Account ${newAccountNumber} found in API response`
)


})