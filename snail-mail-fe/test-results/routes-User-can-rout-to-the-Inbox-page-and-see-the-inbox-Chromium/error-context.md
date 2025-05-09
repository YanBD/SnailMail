# Test info

- Name: User can rout to the Inbox page and see the inbox
- Location: C:\Users\yance\Documents\Career Advancment\Revature\HexawareSDET_00002209\MyCode\SnailMail\snail-mail-fe\playwright_tests\routes.spec.tsx:39:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'Inbox' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Inbox' })
    - waiting for navigation to finish...
    - navigated to "http://localhost:5173/"

    at C:\Users\yance\Documents\Career Advancment\Revature\HexawareSDET_00002209\MyCode\SnailMail\snail-mail-fe\playwright_tests\routes.spec.tsx:48:62
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
- heading "welcomeHeading" [level=2]: Welcome yanbd
- paragraph: Thank you for using SnailMail.
- paragraph: Please select Inbox on the left of your screen to check Inbox.
- paragraph: You can compose a new email with the icon found in the bottom right of you screen
- paragraph: Select Signout when you are done for the day
- paragraph: Thank you for using SnailMail. To check your messages please select Inbox
- link "logout":
  - /url: /auth/logout
  - text: Log Out
- button "📧"
- text: )
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
   9 |     await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible({timeout: 6_000})
  10 |     await expect(page.getByRole('link', {name: 'login'})).toBeVisible()
  11 | })
  12 |
  13 | //test 2. Checks if guest can route to homepage but not see compose button
  14 | test('Guest can route to the home page but not see compose button', async ({browser}) => {
  15 |     const browserContext = await browser.newContext()
  16 |     const page = await browserContext.newPage()
  17 |     await page.goto('http://LocalHost:5173/')
  18 |     await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
  19 |     await expect(page.getByRole('button', {name: '📧'})).not.toBeVisible()
  20 |     await expect(page.getByRole('link', {name: 'login'})).toBeVisible()
  21 |     await expect(page.getByRole('link', {name: 'signup'})).toBeVisible()
  22 | })
  23 |
  24 | //Test 3. Check if a user can route to home page and see compose button
  25 | test('User can route to home page and see the compose button', async ({browser}) =>{
  26 |     const browserContext = await browser.newContext()
  27 |     const page = await browserContext.newPage()
  28 |     await page.goto('http://LocalHost:5173/')
  29 |     await page.getByRole('link', {name: 'login'}).click()
  30 |     await page.getByRole('textbox', {name: 'username'}).fill('yanbd')
  31 |     await page.getByRole('textbox', {name: 'password'}).fill('password')
  32 |     await page.getByRole('button', {name: 'Log In'}).click()
  33 |     await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
  34 |     await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
  35 |     await expect(page.getByRole('link', {name: 'logout'})).toBeVisible()
  36 | })
  37 |
  38 | //test 4. checks user can route to the Inbox page
  39 | test('User can rout to the Inbox page and see the inbox', async ({browser}) => {
  40 |     const browserContext = await browser.newContext()
  41 |     const page = await browserContext.newPage()
  42 |     await page.goto('http://LocalHost:5173/')
  43 |     await page.getByRole('link', {name: 'login'}).click()
  44 |     await page.getByRole('textbox', {name: 'username'}).fill('yanbd')
  45 |     await page.getByRole('textbox', {name: 'password'}).fill('password')
  46 |     await page.getByRole('button', {name: 'Log In'}).click()
  47 |     await expect (page.getByTitle('Inbox - Snail Mail')).toBeTruthy()
> 48 |     await expect(page.getByRole('heading', {name: 'Inbox'})).toBeVisible()
     |                                                              ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  49 |     await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
  50 |     
  51 | })
  52 |
```