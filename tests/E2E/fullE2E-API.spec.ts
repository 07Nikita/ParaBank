import { test, expect } from "@playwright/test"
import data from "../../data/data.json"

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test('API E2E - Login Create Account Transfer Funds Verify Balance', async ({ request }) => {

    let loginRes = await request.get(`${baseURL}/login/${data.username}/${data.password}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    expect(loginRes.status()).toBe(200)

    let loginBody = await loginRes.json()

    const customerId = loginBody.id

    console.log("Customer ID:", customerId)

    let accountsRes = await request.get(`${baseURL}/customers/${customerId}/accounts`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    expect(accountsRes.status()).toBe(200)

    let accountsBody=await accountsRes.json()

    const fromAccountId=accountsBody[0].id

    console.log("Source Account:", fromAccountId)

    let createRes = await request.post(`${baseURL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${fromAccountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    expect(createRes.status()).toBe(200)

    let createBody = await createRes.json()

    const newAccountId = createBody.id

    console.log("New Account:", newAccountId)

    let beforeSourceRes = await request.get(`${baseURL}/accounts/${fromAccountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    let beforeDestinationRes = await request.get(`${baseURL}/accounts/${newAccountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    const beforeSourceBody = await beforeSourceRes.json()
    const beforeDestinationBody = await beforeDestinationRes.json()

    const sourceBalanceBefore = Number(beforeSourceBody.balance)
    const destinationBalanceBefore = Number(beforeDestinationBody.balance)

    console.log("Source Balance Before:", sourceBalanceBefore)
    console.log("Destination Balance Before:", destinationBalanceBefore)

    const transferAmount = 10

    let transferRes = await request.post(`${baseURL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${newAccountId}&amount=${transferAmount}`)

    expect(transferRes.status()).toBe(200)

    let afterSourceRes = await request.get(
        `${baseURL}/accounts/${fromAccountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    let afterDestinationRes = await request.get(
        `${baseURL}/accounts/${newAccountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    const afterSourceBody = await afterSourceRes.json()
    const afterDestinationBody = await afterDestinationRes.json()

    const sourceBalanceAfter = Number(afterSourceBody.balance)
    const destinationBalanceAfter = Number(afterDestinationBody.balance)

    console.log("Source Balance After:", sourceBalanceAfter)
    console.log("Destination Balance After:", destinationBalanceAfter)

    expect(sourceBalanceAfter)
        .toBe(sourceBalanceBefore - transferAmount)

    expect(destinationBalanceAfter)
        .toBe(destinationBalanceBefore + transferAmount)

})