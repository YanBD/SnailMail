import { test, expect } from "@playwright/test";

// Test 1. CHecks user is routed to error page when using an invalid URL and can return to the home page.
test('User routes to error page when using an invalid URL', async ({browser}) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/invalidURL')
    await expect(page.getByRole('heading', {name: '404 - Page Not Found'})).toBeVisible()
    await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible({timeout: 6_000})
    await expect(page.getByRole('link', {name: 'login'})).toBeVisible()
})

//test 2. Checks if guest can route to homepage but not see compose button
test('Guest can route to the home page but not see compose button', async ({browser}) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/')
    await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
    await expect(page.getByRole('button', {name: '📧'})).not.toBeVisible()
    await expect(page.getByRole('link', {name: 'login'})).toBeVisible()
    await expect(page.getByRole('link', {name: 'signup'})).toBeVisible()
})

//Test 3. Check if a user can route to home page and see compose button
test('User can route to home page and see the compose button', async ({browser}) =>{
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/')
    await page.getByRole('link', {name: 'login'}).click()
    await page.getByRole('textbox', {name: 'username'}).fill('yanbd')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', {name: 'Log In'}).click()
    await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
    await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
    await expect(page.getByRole('link', {name: 'logout'})).toBeVisible()
})

//test 4. checks user can route to the Inbox page
test('User can rout to the Inbox page and see their inbox', async ({browser}) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/')
    await page.getByRole('link', {name: 'login'}).click()
    await page.getByRole('textbox', {name: 'username'}).fill('yanbd')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', {name: 'Log In'}).click()
    await page.getByRole('link', {name: 'inbox'}).click()
    await expect (page.getByTitle('Inbox - Snail Mail')).toBeTruthy()
    await expect(page.getByRole('heading', {name: 'Inbox'})).toBeVisible()
    await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
    
})

//test 5. checks if guest tries to access Inbox they are routed to login page
test("Guest can not access Inbox and are redirected to login page", async ({browser}) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/')
    await page.getByRole('link', {name: 'inbox'}).click()
    await expect(page.getByTitle('User Authentication - Snail Mail')).toBeTruthy()
})
