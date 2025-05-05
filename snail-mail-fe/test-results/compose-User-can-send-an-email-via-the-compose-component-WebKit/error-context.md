# Test info

- Name: User can send an email via the compose component
- Location: C:\Users\yance\Documents\Career Advancment\Revature\HexawareSDET_00002209\MyCode\SnailMail\snail-mail-fe\playwright_tests\compose.spec.tsx:10:1

# Error details

```
Error: page.waitForResponse: Target page, context or browser has been closed
=========================== logs ===========================
waiting for response "http://localhost:8080/mail"
============================================================
    at C:\Users\yance\Documents\Career Advancment\Revature\HexawareSDET_00002209\MyCode\SnailMail\snail-mail-fe\playwright_tests\compose.spec.tsx:19:33
```

# Test source

```ts
   1 | import {test, expect, request} from '@playwright/test';
   2 |
   3 | test.beforeEach(async ({page}) => {
   4 |     await page.goto('/')
   5 |     await page.getByRole('button', {name: '📧'}).click()
   6 |     await expect (page.getByTestId('compose-component')).toBeVisible()
   7 | })
   8 |
   9 | // Test 1
  10 | test('User can send an email via the compose component', async ({page}) => {
  11 |     await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
  12 |     await page.getByRole('textbox', {name: 'subject'}).fill('Hello')
  13 |     await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
  14 |     page.on('dialog', async (dialog) => {
  15 |         expect(dialog.message()).toBe('Sent mail to yan@snailmail.com')
  16 |         await dialog.accept()
  17 |     })
  18 |     await page.getByRole('button', {name: 'Send'}).click()
> 19 |     const response = await page.waitForResponse('http://localhost:8080/mail')
     |                                 ^ Error: page.waitForResponse: Target page, context or browser has been closed
  20 |     expect(response.status()).toBe(200)
  21 |     const jsonResponse = await response.json()
  22 |     expect(jsonResponse.recipient).toBe('yan@snailmail.com')
  23 |     expect(jsonResponse.subject).toBe('Hello')
  24 |     expect(jsonResponse.body).toBe('This is your Playwright test')
  25 | })
  26 |
  27 | // Test 2
  28 | test('Shows alert when message has no subject', async ({page}) =>{
  29 |     await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
  30 |     await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
  31 |     await page.getByRole('button', {name: 'Send'}).click()
  32 |     page.on('dialog', async (dialog) => {
  33 |         expect(dialog.message()).toBe('Please fill in all fields')
  34 |     })
  35 | })
  36 |
  37 | // Test 3
  38 | test('Backend rejects emails with missing recipient', async () => {
  39 |     const requestConntex = await request.newContext()
  40 |     const response = await requestConntex.post('http://localhost:8080/mail', {
  41 |         data: {
  42 |             subject: 'Hello',
  43 |             body: 'This is your Playwright test'
  44 |         }
  45 |     })
  46 |     expect(response.status()).toBe(400)
  47 |     const body = await response.text()
  48 |     expect(body).toBe("")
  49 | })
  50 |
  51 | // Test 4
  52 | test('Appropiate error alert while sending email when backend fails', async ({page}) => {
  53 |     await page.route('http://localhost:8080/mail', async route => {
  54 |         route.abort()
  55 |     })
  56 |     await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
  57 |     await page.getByRole('textbox', {name: 'subject'}).fill('Hello')
  58 |     await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
  59 |
  60 |     page.on('dialog', async (dialog) => {
  61 |         expect(dialog.message()).toContain('There was an issue sending your Message')
  62 |     })
  63 | })
  64 |
  65 | // Test 5
  66 | test('Closes the compose email form when the close button is clicked and renders compose button', async ({page}) => {
  67 |     await page.locator('button.btn-close').click()
  68 |     await expect(page.getByTestId('compose-component')).not.toBeVisible()
  69 |     await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
  70 | })
  71 |
  72 | //test 6
  73 | test('logs correct data from the backend after sending an email', async ({page}) => {
  74 |     await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
  75 |     await page.getByRole('textbox', {name: 'subject'}).fill('Hello')
  76 |     await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
  77 |     page.on('console', msg => {
  78 |         expect(msg.text()).toContain("{sender: me@snailmail.com")
  79 |     })
  80 | })
  81 |
```