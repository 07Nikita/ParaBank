# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\registration.spec.ts >> registration
- Location: tests\UI\registration.spec.ts:4:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#rightPanel')
Timeout: 5000ms
- Expected substring  -   1
+ Received string     + 119

- Your account was created successfully. You are now logged in.
+
+ 					
+
+
+
+ Signing up is easy!
+
+ If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
+
+
+   
+     
+       First Name:
+       
+         
+       
+       
+         First name is required.
+       
+     
+     
+       Last Name:
+       
+         
+       
+       
+         
+       
+     
+     
+       Address:
+       
+         
+       
+       
+         
+       
+     
+     
+       City:
+       
+         
+       
+       
+         
+       
+     
+     
+       State:
+       
+         
+       
+       
+         
+       
+     
+     
+       Zip Code:
+       
+         
+       
+       
+         
+       
+     
+     
+       Phone #:
+       
+         
+       
+       
+         
+       
+     
+     
+       SSN:
+       
+         
+       
+       
+         
+       
+     
+      
+     
+       Username:
+       
+         
+       
+       
+         
+       
+     
+     
+       Password:
+       
+         
+       
+       
+         
+       
+     
+     
+       Confirm:
+       
+         
+       
+       
+         
+       
+         
+     
+        
+       Register
+     
+   
+   
+
+ 				

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#rightPanel')
    13 × locator resolved to <div id="rightPanel">…</div>
       - unexpected value "
					



Signing up is easy!

If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.


  
    
      First Name:
      
        
      
      
        First name is required.
      
    
    
      Last Name:
      
        
      
      
        
      
    
    
      Address:
      
        
      
      
        
      
    
    
      City:
      
        
      
      
        
      
    
    
      State:
      
        
      
      
        
      
    
    
      Zip Code:
      
        
      
      
        
      
    
    
      Phone #:
      
        
      
      
        
      
    
    
      SSN:
      
        
      
      
        
      
    
     
    
      Username:
      
        
      
      
        
      
    
    
      Password:
      
        
      
      
        
      
    
    
      Confirm:
      
        
      
      
        
      
        
    
       
      Register
    
  
  

				"

```

```yaml
- heading "Signing up is easy!" [level=1]
- paragraph: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
- table:
  - rowgroup:
    - 'row "First Name: First name is required."':
      - cell "First Name:"
      - cell:
        - textbox
      - cell "First name is required."
    - 'row "Last Name: Meena"':
      - cell "Last Name:"
      - cell "Meena":
        - textbox: Meena
      - cell
    - 'row "Address: 123 street"':
      - cell "Address:"
      - cell "123 street":
        - textbox: 123 street
      - cell
    - 'row "City: xyz city"':
      - cell "City:"
      - cell "xyz city":
        - textbox: xyz city
      - cell
    - 'row "State: abc state"':
      - cell "State:"
      - cell "abc state":
        - textbox: abc state
      - cell
    - 'row "Zip Code: 12345"':
      - cell "Zip Code:"
      - cell "12345":
        - textbox: "12345"
      - cell
    - 'row "Phone #: 91234567890"':
      - 'cell "Phone #:"'
      - cell "91234567890":
        - textbox: "91234567890"
      - cell
    - 'row "SSN: 123456789"':
      - cell "SSN:"
      - cell "123456789":
        - textbox: "123456789"
      - cell
    - row:
      - cell
    - 'row "Username: nikita3885"':
      - cell "Username:"
      - cell "nikita3885":
        - textbox: nikita3885
      - cell
    - row "Password:":
      - cell "Password:"
      - cell:
        - textbox
      - cell
    - row "Confirm:":
      - cell "Confirm:"
      - cell:
        - textbox
      - cell
    - row "Register":
      - cell
      - cell "Register":
        - button "Register"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import Registration from "../../POM/registration"
  3  | 
  4  | test("registration", async ({ page }) => {
  5  |     
  6  |     const reg = new Registration(page)
  7  |     
  8  |     await page.goto('https://parabank.parasoft.com/parabank/index.htm')
  9  |     
  10 |     await reg.navigateToRegister()
  11 | 
  12 |     await expect(page).toHaveURL(/register.htm/)
  13 |     
  14 |     await reg.registerUser()
  15 |     
> 16 |     await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.')
     |                                               ^ Error: expect(locator).toContainText(expected) failed
  17 | 
  18 |     await page.screenshot({path:'screenshots/UI/registration.png'})
  19 | 
  20 |     // await reg.collectAccId()
  21 | 
  22 |    
  23 | })
```