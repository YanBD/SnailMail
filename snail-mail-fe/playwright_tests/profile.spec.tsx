import {test, expect} from "@playwright/test";

//Before each navigates to landing page then clicks on the profile link
//and checks if the inbox page is visible
test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByRole('link', {name: 'login'}).click()
    await page.getByRole('textbox', {name: 'username'}).fill('yanbd')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', {name: 'Log In'}).click()
    await page.getByRole('link', {name: 'UserProfile'}).click()
    page.removeAllListeners()
})

//Test 1. check that profile fields are read-only
test("User profile fields are read only", async ({page}) =>  {
    await expect(page.getByRole('textbox' , {name: 'Username'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'Username'})).toHaveAttribute('readonly','')
    await expect(page.getByRole('textbox' , {name: 'Email'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'email'})).toHaveAttribute('readonly','')
    await expect(page.getByRole('textbox' , {name: 'given name'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'given name'})).toHaveAttribute('readonly','')
    await expect(page.getByRole('textbox' , {name: 'family name'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'family name'})).toHaveAttribute('readonly','')
    await expect(page.getByRole('button', { name: 'Edit User' })).toBeVisible
    await expect(page.getByRole('textbox', {name: 'password'})).not.toBeVisible()
})

//Test 2. Check that clicking unlock user forms
test("Profile field become editable when clicking edit user", async ({page}) => {
    await page.getByRole('button', {name: 'edit user'}).click()
    await expect(page.getByRole('textbox' , {name: 'Username'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'Username'})).not.toHaveAttribute('readonly','')
    await expect(page.getByRole('textbox' , {name: 'Email'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'Email'})).toHaveAttribute('readonly','')
    await expect(page.getByRole('textbox' , {name: 'given name'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'given name'})).not.toHaveAttribute('readonly','')
    await expect(page.getByRole('textbox' , {name: 'family name'})).toBeVisible()
    await expect(page.getByRole('textbox' , {name: 'family name'})).not.toHaveAttribute('readonly','')
    await expect(page.getByRole('textbox', {name: 'password'})).toBeVisible()
    await expect(page.getByRole('button', { name: 'Update User' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible()
})

//Test 3. Catch alert when trying to change username to less than 4 character
test("Catch alert when test fails due to wrong username length", async ({page}) => {
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'Username'}).clear()
    await page.getByRole('textbox' , {name: 'Username'}).fill('yanb')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.on("dialog", async (dialog) => {
        expect (dialog.message()).toBe('username must be atleast 5 characters')
        dialog.accept()        
    })
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'username'})).toHaveValue('yanbd')
})

//Test 4. Catch alert when trying to change given name to less than 4 character
test("Catch alert when test fails due to wrong given name length", async ({page}) => {
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'given name'}).clear()
    await page.getByRole('textbox' , {name: 'given name'}).fill('Brya')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.on("dialog", async (dialog) => {
        expect (dialog.message()).toBe('firstName must be atleast 5 characters')
        dialog.accept()        
    })
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'given name'})).toHaveValue('Bryan')
})

//Test 5. Catch alert when trying to change family name to less than 4 character
test("Catch alert when test fails due to wrong family name length", async ({page}) => {
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'family name'}).clear()
    await page.getByRole('textbox' , {name: 'family name'}).fill('Yanc')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.on("dialog", async (dialog) => {
        expect (dialog.message()).toBe('lastName must be atleast 5 characters')
        dialog.accept()        
    })
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'family name'})).toHaveValue('Yancey')
})

//Test 6. successfully change family name
test("Successfully change family name", async ({page}) => {
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'family name'}).clear()
    await page.getByRole('textbox' , {name: 'family name'}).fill('Yancy')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'family name'})).toHaveValue('Yancy')
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'family name'}).clear()
    await page.getByRole('textbox' , {name: 'family name'}).fill('Yancey')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'family name'})).toHaveValue('Yancey')
})

//Test 7 succssfully change username
test("Successfully change username", async ({page}) => {
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'username'}).clear()
    await page.getByRole('textbox' , {name: 'username'}).fill('yanbd2')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'username'})).toHaveValue('yanbd2')
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'username'}).clear()
    await page.getByRole('textbox' , {name: 'username'}).fill('yanbd')
    await page.getByRole('textbox', {name: 'password'}).fill('password')
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'username'})).toHaveValue('yanbd')
})

//Test 8. Catch alert when trying to update user info with incorect password
test("Catch alert when test fails due to incorrect password", async ({page}) => {
    await page.getByRole('button', {name: 'edit user'}).click()
    await page.getByRole('textbox' , {name: 'given name'}).clear()
    await page.getByRole('textbox' , {name: 'given name'}).fill('Bryan1')
    await page.getByRole('textbox', {name: 'password'}).fill('passwor')
    await page.on("dialog", async (dialog) => {
        expect (dialog.message()).toBe('User Password does not match')
        dialog.accept()        
    })
    await page.getByRole('button', { name: 'Update User' }).click()
    await expect(page.getByRole('textbox', {name: 'given name'})).toHaveValue('Bryan')
})