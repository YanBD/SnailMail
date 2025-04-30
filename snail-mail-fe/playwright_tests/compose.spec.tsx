import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByRole('button', {name: '📧'}).click()
})

// Test 1
test('User can send an email via the compose component', async ({page}) => {
    await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
    await page.getByRole('textbox', {name: 'subject'}).fill('Hello')
    await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
    await page.getByRole('button', {name: 'Send'}).click()
    page.on('dialog', async (dialog) => {
        console.log(dialog.message())
        expect(dialog.message()).toBe('Sent mail to yan@snailmail.com')
        dialog.dismiss()
    })
    const response = await page.waitForResponse('**/mail')
    expect(response.status()).toBe(200)
    const jsonResponse = await response.json()
    expect(jsonResponse.recipient).toBe('yan@snailmail.com')
    expect(jsonResponse.subject).toBe('Hello')
    expect(jsonResponse.body).toBe('This is your Playwright test')
})

// Test 2
test('Shows alert when message has no subject', async ({page}) =>{
    await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
    await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
    await page.getByRole('button', {name: 'Send'}).click()
    page.on('dialog', async (dialog) => {
        console.log(dialog.message())
        expect(dialog.message()).toBe('Please fill in all fields')
    })
})