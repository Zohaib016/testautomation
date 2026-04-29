import LoginPage from '../pages/Loginpage'
import DashboardPage from '../pages/Dashboardpage'

describe('Login Tests', () => {
  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  let testData

  before(() => {
    // Load fixture data once
    cy.fixture('loginData').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    loginPage.visit()
  })

  it('should show validation errors when submitting empty form', () => {
    loginPage.login(testData.emptyUser.email, testData.emptyUser.password)

    loginPage.getEmailRequiredError().should('be.visible')
    loginPage.getPasswordRequiredError().should('be.visible')
    cy.screenshot('showvalidation error')
  })

  it('should show error for invalid credentials', () => {
    loginPage.login(testData.invalidUser.email, testData.invalidUser.password)

    loginPage.getInvalidLoginError().should('be.visible')
    loginPage.getInvalidLoginMessage().should('be.visible')
    cy.screenshot('invalidcredentials error')
  })

  it('should login successfully and logout', () => {
    loginPage.login(testData.validUser.email, testData.validUser.password)

    dashboardPage.getDashboardHeading().should('be.visible')
    dashboardPage.signOut()
    cy.url().should('include', '/sign-in')
    cy.screenshot('LoginSuccessfully')
  })
})