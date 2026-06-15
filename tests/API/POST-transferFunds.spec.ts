import { test, expect } from '@playwright/test'
import data from "../../data/data.json"

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test("transfer funds",async({request})=>{

    let transferAmount = 10

    let res = await request.post(`${baseURL}/transfer?fromAccountId=${data.accountId}&toAccountId=${data.newAccountId}&amount=${transferAmount}`)

    let body = await res.text()

    console.log(body)

    expect(body).not.toContain("error")
})