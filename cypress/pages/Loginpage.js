class LoginPage {
  visit() {
    cy.visit('https://urban-re-3e5ca.web.app/')
    cy.get('a[href="/sign-in"]').click()
    cy.contains('h1', 'Welcome back').should('be.visible')
  }

  getEmailInput() {
    return cy.get('input[type="email"]')
  }

  getPasswordInput() {
    return cy.get('input[type="password"]')
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]')
  }

  getEmailRequiredError() {
    return cy.contains('Email is required')
  }

  getPasswordRequiredError() {
    return cy.contains('Password is required')
  }

  getInvalidLoginError() {
    return cy.contains('Sign in failed')
  }

  getInvalidLoginMessage() {
    return cy.contains('Invalid login credentials')
  }

  login(email, password) {
    if (email) this.getEmailInput().type(email)
    if (password) this.getPasswordInput().type(password)
    this.getSubmitButton().click()
  }
}

export default LoginPage