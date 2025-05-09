import {test, expect, request} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByRole('link', {name: 'login'}).click()
    await page.getByRole('textbox', {name: 'username'}).fill('yanbd')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', {name: 'Log In'}).click()
    await page.getByRole('button', {name: '📧'}).click()
    await expect (page.getByTestId('compose-component')).toBeVisible()
    page.removeAllListeners()
})

// Test 1
test('User can send an email via the compose component', async ({page}) => {
    await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
    await page.getByRole('textbox', {name: 'subject'}).fill('Hello')
    await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Sent mail to yan@snailmail.com')
        await dialog.accept()
    })
    await page.getByRole('button', {name: 'Send'}).click()
    const response = await page.waitForResponse('http://localhost:8080/mail')
    expect(response.status()).toBe(200)
    const jsonResponse = await response.json()
    expect(jsonResponse.recipient).toBe('yan@snailmail.com')
    expect(jsonResponse.subject).toBe('Hello')
    expect(jsonResponse.body).toBe('This is your Playwright test')
})

// Test 2.a
test('Shows alert when message has no subject', async ({page}) =>{
    await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
    await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
    await page.getByRole('button', {name: 'Send'}).click()
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Subject cannot be empty')
        await dialog.accept()
    })
})

// Test 2.b
test('Shows alert when message has no recipient', async ({page}) =>{
    await page.getByRole('textbox', {name: 'subject'}).fill('test')
    await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
    await page.getByRole('button', {name: 'Send'}).click()
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Recipient cannot be empty')
        await dialog.accept()
    })
})

// Test 2.c
test('Shows alert when message has no body', async ({page}) =>{
    await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
    await page.getByRole('textbox', {name: 'subject'}).fill('test')
    await page.getByRole('button', {name: 'Send'}).click()
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Body cannot be empty')
        await dialog.accept()
    })
})

// Test 3.a
test('Backend rejects emails with missing recipient', async () => {
    const requestConntex = await request.newContext()
    const response = await requestConntex.post('http://localhost:8080/mail', {
        data: {
            subject: 'Hello',
            body: 'This is your Playwright test'
        }
    })
    expect(response.status()).toBe(400)
    const body = await response.text()
    expect(body).toContain('Recipient cannot be empty')
})

// Test 3.b
test('Backend rejects emails with missing subject', async () => {
    const requestConntex = await request.newContext()
    const response = await requestConntex.post('http://localhost:8080/mail', {
        data: {
            recipient: 'yan@snailmail.com',
            body: 'This is your Playwright test'
        }
    })
    expect(response.status()).toBe(400)
    const body = await response.text()
    expect(body).toContain('Subject cannot be empty')
})

//Test 3.c
test('Backend rejects emails with missing body', async () => {
    const requestConntex = await request.newContext()
    const response = await requestConntex.post('http://localhost:8080/mail', {
        data: {
            recipient: 'yan@snailmail.com',
            subject: 'Hello'
        }
    })
    expect(response.status()).toBe(400)
    const body = await response.text()
    expect(body).toContain('Body cannot be empty')
})

// Test 4
test('Appropiate error alert while sending email when backend fails', async ({page}) => {
    await page.route('http://localhost:8080/mail', async route => {
        route.abort()
    })
    await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
    await page.getByRole('textbox', {name: 'subject'}).fill('Hello')
    await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')

    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('There was an issue sending your Message')
        await dialog.accept()
    })
})

// Test 5
test('Closes the compose email form when the close button is clicked and renders compose button', async ({page}) => {
    await page.locator('button.btn-close').click()
    await expect(page.getByTestId('compose-component')).not.toBeVisible()
    await expect(page.getByRole('button', {name: '📧'})).toBeVisible()
})

//test 6
test('logs correct data from the backend after sending an email', async ({page}) => {
    await page.getByRole('textbox', {name: 'recipient'}).fill('yan@snailmail.com')
    await page.getByRole('textbox', {name: 'subject'}).fill('Hello')
    await page.getByRole('textbox', {name: 'body'}).fill('This is your Playwright test')
    page.on('console', msg => {
        expect(msg.text()).toContain("{sender: me@snailmail.com")
    })
})
