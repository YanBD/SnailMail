# Test info

- Name: User can rout to the Inbox page and see the inbox
- Location: C:\Users\yance\Documents\Career Advancment\Revature\HexawareSDET_00002209\MyCode\SnailMail\snail-mail-fe\playwright_tests\routes.spec.tsx:25:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'Inbox' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Inbox' })

    at C:\Users\yance\Documents\Career Advancment\Revature\HexawareSDET_00002209\MyCode\SnailMail\snail-mail-fe\playwright_tests\routes.spec.tsx:30:62
```

# Page snapshot

```yaml
- navigation:
  - heading "🐌 SnailMail 🐌" [level=2]
- link "home":
  - /url: /
  - text: Home
- link "inbox":
  - /url: /inbox
  - text: Inbox
- heading "Log In" [level=3]
- text: "Username:"
- textbox "Username:"
- text: "Password:"
- textbox "Password:"
- button "Log In"
- link "login":
  - /url: /auth/login
  - text: Log In
- link "signup":
  - /url: /auth/signup
  - text: Sign Up
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | // Test 1. CHecks user is routed to error page when using an invalid URL and can return to the home page.
   4 | test('User routes to error page when using an invalid URL', async ({browser}) => {
   5 |     const browserContext = await browser.newContext()
   6 |     const page = await browserContext.newPage()
   7 |     await page.goto('http://LocalHost:5173/invalidURL')
   8 |     await expect(page.getByRole('heading', {name: '404 - Page Not Found'})).toBeVisible()
   9 |     await expect(page.getByRole('link',{name: 'Go back to Home'})).toBeVisible()
  10 |     await page.getByRole('link',{name: 'Go back to Home'}).click()
  11 |     await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
  12 |     await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
  13 | })
  14 |
  15 | //test 2. Checks user can route to the home page
  16 | test('User can route to the home page', async ({browser}) => {
  17 |     const browserContext = await browser.newContext()
  18 |     const page = await browserContext.newPage()
  19 |     await page.goto('http://LocalHost:5173/')
  20 |     await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
  21 |     await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
  22 | })
  23 |
  24 | //test 3. checks user can route to the Inbox page
  25 | test('User can rout to the Inbox page and see the inbox', async ({browser}) => {
  26 |     const browserContext = await browser.newContext()
  27 |     const page = await browserContext.newPage()
  28 |     await page.goto('http://LocalHost:5173/inbox')
  29 |     await expect (page.getByTitle('Inbox - Snail Mail')).toBeTruthy()
> 30 |     await expect(page.getByRole('heading', {name: 'Inbox'})).toBeVisible()
     |                                                              ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  31 |     await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
  32 | })
  33 |
```