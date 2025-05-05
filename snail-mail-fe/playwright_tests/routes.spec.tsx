import { test, expect } from "@playwright/test";

// Test 1. CHecks user is routed to error page when using an invalid URL and can return to the home page.
test('User routes to error page when using an invalid URL', async ({browser}) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/invalidURL')
    await expect(page.getByRole('heading', {name: '404 - Page Not Found'})).toBeVisible()
    await expect(page.getByRole('link',{name: 'Go back to Home'})).toBeVisible()
    await page.getByRole('link',{name: 'Go back to Home'}).click()
    await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
    await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
})

//test 2. Checks user can route to the home page
test('User can route to the home page', async ({browser}) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/')
    await expect(page.getByRole('heading', {name: 'welcomeHeading'})).toBeVisible()
    await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
})

//test 3. checks user can route to the Inbox page
test('User can rout to the Inbox page and see the inbox', async ({browser}) => {
    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()
    await page.goto('http://LocalHost:5173/inbox')
    await expect (page.getByTitle('Inbox - Snail Mail')).toBeTruthy()
    await expect(page.getByRole('heading', {name: 'Inbox'})).toBeVisible()
    await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
})
