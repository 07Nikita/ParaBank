import { test, expect } from "@playwright/test"
import Login from "../../POM/login-logout"
import accOverview from "../../POM/accOverview"
import data from "../../data/data.json"

let baseURL ="https://parabank.parasoft.com/parabank/services/bank"

test("TC-E2E-02", async ({page,request,}) => {

  //! API - Login

  const loginRes = await request.get(`${baseURL}/login/${data.username}/${data.password}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  )

  expect(loginRes.status()).toBe(200)

  const loginBody = await loginRes.json()

  const customerId = loginBody.id

  console.log("Customer ID:", customerId)

  //! API - Create Account
  

  const createRes = await request.post(`${baseURL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${data.accountId}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  )

  expect(createRes.status()).toBe(200)

  const createBody=await createRes.json()

  const newAccountId=createBody.id.toString()

  console.log("New Account Created:", newAccountId)

  //! UI

  const loginPage = new Login(page)
  const overview = new accOverview(page)

  await page.goto("https://parabank.parasoft.com/parabank/index.htm")

  await loginPage.loginUser()

  await overview.accountOverview()

  await expect(overview.accOverview).toBeVisible()

  //! Verify new account appears in UI

  const accountLocator = page.locator(`//tbody/tr/td/a[text()="${newAccountId}"]`)

  await expect(accountLocator).toBeVisible()

  console.log(`Account ${newAccountId} successfully displayed in UI`)

  await page.screenshot({path: "screenshots/E2E/api-UI.png"})
})