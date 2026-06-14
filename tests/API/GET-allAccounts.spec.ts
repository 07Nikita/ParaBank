import { test, expect } from '@playwright/test'
import data from "../../data/data.json"


let baseURL = "https://parabank.parasoft.com/parabank/services/bank"

test("get all accounts",async({request}) => {

    let res=await request.get(`${baseURL}/customers/${data.customerId}/accounts`,
        {
            headers: {
                Accept: "application/json"
            }
        }
    )

    let body=await res.json()

    console.log(body)

    
})