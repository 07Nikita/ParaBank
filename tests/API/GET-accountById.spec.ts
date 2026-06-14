import { test, expect } from '@playwright/test'
import fs from "fs"
import data from "../../data/data.json"

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test("get Account By id", async ({ request }) => {

    let res = await request.get(`${baseURL}/accounts/${data.accountId}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    let body=await res.json()

    console.log(body)

    data.customerId=body.customerId
    fs.writeFileSync("./data/data.json",JSON.stringify(data, null, 2))

    expect(body.id).toBe(data.accountId)
    expect(body.customerId).toBeDefined()
    expect(body.type).toBeDefined()
    expect(body.balance).toBeDefined()
})