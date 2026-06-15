import { test, expect } from "@playwright/test"
import fs from "fs"
import data from "../../data/data.json"

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test("create new account", async ({ request }) => {

    let res = await request.post(`${baseURL}/createAccount?customerId=${data.customerId}&newAccountType=1&fromAccountId=${data.accountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    expect(res.status()).toBe(200)

    let body = await res.json()

    console.log(body)

    data.newAccountId = body.id
    fs.writeFileSync("./data/data.json",JSON.stringify(data, null, 2))

    expect(body.id).toBeDefined()
    expect(body.customerId).toBe(data.customerId)
    expect(body.type).toBeDefined()
    expect(body.balance).toBeDefined()
})