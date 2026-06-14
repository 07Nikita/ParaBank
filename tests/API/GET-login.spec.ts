import { test, expect } from '@playwright/test'
import data from "../../data/data.json"

let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test("login", async ({ request }) => {

    let res = await request.get(`${baseURL}/login/${data.username}/${data.password}`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    console.log("details:")

    let body = await res.json()

    console.log(body)

})
