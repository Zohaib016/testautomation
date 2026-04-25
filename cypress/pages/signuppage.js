class SignupPage {

  // Navigate from landing page
  visitFromLanding() {
    cy.get('a[href="/sign-up"] button').contains('Get Started').click()
    cy.url().should('include', '/sign-up')
  }

  // Fill signup form
  fillSignupForm(user) {
    cy.get('#username').type(user.username)
    cy.get('#name').type(user.name)
    cy.get('#email').type(user.email)
    cy.get('#password').type(user.password)
    cy.get('#confirmPassword').type(user.confirmPassword)
  }

  clickSubmit() {
    cy.get('button[type="submit"]').click()
  }

  assertEmptyFieldsErrors() {
    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  }

  setupOrganization(user) {
    cy.get('#orgName').type(user.orgName)
    
    // Select organization type dropdown
    cy.get('button[role="combobox"]').click()
    cy.contains('div', user.orgType).click()
    
    cy.get('#population').type(user.population)
  }

  clickContinue() {
    cy.contains('button', 'Continue').click()
  }

  clickConfirm() {
    cy.contains('button', 'Confirm').click()
  }

  goToDashboard() {
    cy.contains('button', 'Go to Dashboard').click()
    cy.url().should('include', '/dashboard')
  }

  assertAlreadyExistsError() {
    cy.contains('Sign up failed').should('be.visible')
    cy.contains('User already registered').should('be.visible')
  }

  
}

export default SignupPage