///<reference types ="cypress" />

describe("Compose Component Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/"); // Adjust the URL to your application's base URL
    })

    //test Project 1------------------

    it("renders the compose email form when the compose button is clicked", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']")
        .should("exist")
        .should("be.visible")
        cy.get("input[name='recipient']").should("be.visible")
        cy.get("input[name='subject']").should("be.visible")
        cy.get("textarea[name='body']").should("be.visible")
    })

    //test Project 2------------------
    it("closes the compose email form when the close button is clicked", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("button.btn-close").click()
        cy.get("[data-testid='compose-component']").should("not.exist")
    })

    //test Project 3------------------
    it("displays an error message if user tries to send an email missing fields", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("input[name='recipient']").type(" ")
        cy.get("input[name='subject']").type(" ")
        cy.get("textarea[name='body']").type(" ")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "Please fill in all fields")
        cy.get("[data-testid='compose-component']").should("exist")
    })

    //test Project 4------------------
    it("displays an error message if the HTTP request fails", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.intercept("POST", "http://localhost:8080/mail", {
            forceNetworkError: true
        })
        cy.get("input[name='recipient']").type("yan@snailmail.com")
        cy.get("input[name='subject']").type("Hello")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "There was an issue sending your Message")
    })

    //test Project 5------------------
    it("diplays success message when email is sent and closes the compose form", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.intercept("POST", "http://localhost:8080/mail", {
            statusCode: 200,
            body: {message: "Email sent"}
        })
        cy.get("input[name='recipient']").type("yan@snailmail.com")
        cy.get("input[name='subject']").type("Hello")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "Sent mail to yan@snailmail.com")
        cy.get("[data-testid='compose-component']").should("not.exist")
    })

    //test Project 6.a------------------
    it("displays an error message if the recipient email is invalid part 1", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("input[name='recipient']").type("yansnailmail.com")
        cy.get("input[name='subject']").type("Hello")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "Please enter a valid email address")
    })

    //test Project 6.b------------------
    it("displays an error message if the recipient email is invalid part 2", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("input[name='recipient']").type("yan@snailmail")
        cy.get("input[name='subject']").type("Hello")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "Please enter a valid email address")
    })

    //test Strech goal 1------------------
    it("captures the data typed in the mailToSend object", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("input[name='recipient']").type("yan@snailmail.com")
        cy.get("input[name='subject']").type("Hello")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("input[name= 'recipient']").should("have.value", "yan@snailmail.com")
        cy.get("input[name= 'subject']").should("have.value", "Hello")
        cy.get("textarea[name= 'body']").should("have.value", "This is your Cypress test")
    })

     //test Strech goal 2------------------
     it("diplays error message if subjuct greater than 20 characters", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("input[name='recipient']").type("yan@snailmail.com")
        cy.get("input[name='subject']").type("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "Subject is too long")
        cy.get("[data-testid='compose-component']").should("exist")
    })

    //test extra 1------------------
    it("displays an error message if the email is sent to the same sender and recipient", () => {
        cy.get("button").contains("📧").click()
        cy.get("[data-testid='compose-component']").should("exist")
        cy.get("input[name='recipient']").type("me@snailmail.com")
        cy.get("input[name='subject']").type("Hello")
        cy.get("textarea[name='body']").type("This is your Cypress test")
        cy.get("button").contains("Send").click()
        cy.on("window:alert", cy.stub().as("alert"))
        cy.get("@alert").should("have.been.calledWith", "You cannot send an email to yourself")
    })


})