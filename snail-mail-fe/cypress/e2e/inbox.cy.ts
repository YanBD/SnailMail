///<reference types ="cypress" />

describe("Inbox Component Tests", () => {

    beforeEach(() => {
        cy.visit("http://localhost:5173/"); // Adjust the URL to your application's base URL
        cy.get(".btn").contains("Log In").click()
        cy.get("input[name ='username']").type("yanbd")
        cy.get("input[name ='password']").type("password")
        cy.get("button[name = 'submitLogin']").click()
        cy.get(".btn").contains("Inbox").click()
    })


    ///Test 1
    it("Fetches and displays the inbox from the backend", () => {
        cy.intercept("GET", "http://localhost:8080/mail").as("getInbox")
        cy.get(".btn").reload()
        cy.wait("@getInbox").its("response.statusCode").should("eq", 200)
        cy.get("table").should("exist")
        cy.contains("Subject").should("exist")

        cy.get("tbody tr").first().within(() => {
            cy.get("td").eq(0).should("not.be.empty")
            cy.get("td").eq(1).should("not.be.empty")
            cy.get("td").eq(2).should("not.be.empty")
        })
    })

    ///Test 2
    it("Shows an empty inbox message when there are no emails", () => {
        cy.intercept("GET", "/mail", { body: [] }) // Mocking the response to return an empty array
        cy.get(".btn").reload()
        cy.get("table").should("not.exist")
        cy.contains("No Mail! You're all caught up!").should("exist")
    })

    //test 3------------
    it("Displays an error alert and shows the 'no mail' message with fetch inbox request fails", () => {

        
        cy.intercept("GET", "/mail", {
            forceNetworkError: true //fail the test, triggering the catch block in the component
        })

        cy.get(".btn").reload      
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "Please try again later")

    })

    //test 4------------------
    it.only ("displays fake mail after intercepting the Get Request with a fixture", () => {
        cy.intercept("GET", "/mail", {fixture: "inbox.json"})
        cy.get(".btn").reload()
        cy.get("Table").should("exist")
        cy.contains("td", "beetle@snailmail.com").should("exist")
        cy.contains("td", "I am a beetle").should("exist")
        cy.contains("td", "I am a beetle I am telling you I'm a beetle").should("exist")
    })    

    //test strech goal 3------------------
    it ("displays a success message when replying to an email", () => {
        cy.get(".btn").contains("Inbox").click()
        cy.get("button").contains("slug@snailmail.com").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("input[name='recipient']").should("have.value", "slug@snailmail.com")
        cy.get("input[name='subject']").should("have.value", "Re: Hey")
        cy.get("textarea[name='body']").should("have.value", "\n\n--- Original Message ---\nI am a slug")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "Sent mail to slug@snailmail.com")
    })

})
