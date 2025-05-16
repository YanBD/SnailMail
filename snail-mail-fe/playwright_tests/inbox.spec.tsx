import {test, expect} from "@playwright/test";

//Before each navigates to landing page then clicks on the inbox link
//and checks if the inbox page is visible
test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByRole('link', {name: 'login'}).click()
    await page.getByRole('textbox', {name: 'username'}).fill('yanbd')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', {name: 'Log In'}).click()
    await page.getByRole('link', {name: 'inbox'}).click()
    page.removeAllListeners()

})

//Test 1
//Test if user can see Inbox table from the inbox component
//Test if the inbox table has the correct headers and is visible
test('User can see the inbox table', async ({page}) => {
    page.reload()
    await expect (page.getByRole('heading', {'name': 'Inbox'})).toBeVisible()
    await expect (page.getByRole('cell', {'name': 'Subject'})).toBeVisible()
    await expect (page.getByRole('cell', {'name': 'Sender'})).toBeVisible()
    await expect (page.getByRole('cell', {'name': 'Message'})).toBeVisible()
})


//Test 2
//Test if the messge for an empty Inbox is visible when there are no emails
test('Empty Inbox when there are no emails', async ({page}) => {
    //Intercept the GET request to the inbox and return an empty array
    await page.route('http://localhost:8080/mail', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([])
        })
        
    })
    //Reload the page to trigger the GET request
    await page.reload()
    await expect (page.getByText('No Mail! You\'re all caught up!')).toBeVisible()
})

//Test 3
//Test if alert pops up when the fetch inbox request fails
test('Alert pops up when fetch inbox request fails', async ({page}) => {
    //Intercept the get request to the Inbox and return a 400 error
    await page.route('http://localhost:8080/mail', route => {
        route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({})
        })
    })
    //Reload the page to trigger the GET request
    await page.reload()
    //Check if the alert pops up with the correct message
    page.on('dialog', async (dialog) => {
        expect (dialog.message()).toBe('Please try again later')
        await dialog.accept()
    })
})

//Test 4
//Test if user can reply to an email through the inbox component
test('User can reply to an email', async ({page}) => {
    await page.getByRole('button', {'name': 'slug@snailmail.com'}).click()
    await expect (page.getByTestId('compose-component')).toBeVisible()
    await expect (page.getByRole('textbox', {'name': 'recipient'})).toHaveValue('slug@snailmail.com')
    await page.getByRole('textbox', {'name': 'body'}).fill('This has been sent from the reply function through the inbox component')
    await page.getByRole('button', {'name': 'Send'}).click()
    page.on('dialog', async (dialog) => {
        expect (dialog.message()).toBe('Sent mail to slug@snailmail.com')
        dialog.dismiss()
    })    
    const response = await page.waitForResponse('http://localhost:8080/mail')
    expect (response.status()).toBe(200)
    const jsonResponse = await response.json()
    expect (jsonResponse.recipient).toBe('slug@snailmail.com')
    expect (jsonResponse.body).toBe('This has been sent from the reply function through the inbox component')
    expect (jsonResponse.subject).toBe('Re: Hey')
})

//Test 5
//Test if the user can see the compose component when the compose button is clicked
test('user can see the compose button and the compose component', async ({page}) => {
    await expect (page.getByRole('button', {name: '📧'})).toBeVisible()
    await page.getByRole('button', {name: '📧'}).click()
    await expect (page.getByTestId('compose-component')).toBeVisible()
    await page.getByRole('button', {name: 'Close'}).click()
    await expect (page.getByTestId('compose-component')).not.toBeVisible()
})

//Test 6
//Test if user can see the home link on sidebar and navigate to the home page
test('User can go to home page from the sidebar', async ({page}) => {
    await expect (page.getByRole('link', {'name': 'home'})).toBeVisible()
    await page.getByRole('link', {'name': 'home'}).click()
    expect (page.getByTitle('Home - Snail Mail')).toBeTruthy()
    await expect(page.getByRole('heading', {'name': 'welcomeHeading'})).toBeVisible()
})