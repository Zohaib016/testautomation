import SignupPage from '../pages/signuppage'

describe('Signup Flow', () => {
  const signupPage = new SignupPage()
  let testData

  before(() => {
    cy.fixture('signupData').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    cy.visit('https://urban-re-3e5ca.web.app/')
    signupPage.visitFromLanding()
  })

  it('should show errors when submitting empty signup form', () => {
    signupPage.clickSubmit()
    signupPage.assertEmptyFieldsErrors()
    cy.screenshot('emptyfieldserror')
  })

  it('should signup successfully with a unique email', () => {
    // Generate unique email
    const uniqueEmail = `user_${Date.now()}@example.com`
    const user = { ...testData.validUser, email: uniqueEmail }

    signupPage.fillSignupForm(user)
    signupPage.clickSubmit()
    cy.wait(1000)

    // Organization setup
    signupPage.setupOrganization(user)
    signupPage.clickContinue()
    cy.wait(1000)
    signupPage.clickConfirm()
    cy.wait(1000)
    signupPage.goToDashboard()
    cy.screenshot('signupsucessfully')
  })

  it('should show error for already registered user', () => {
    signupPage.fillSignupForm(testData.validUser)
    signupPage.clickSubmit()
    signupPage.assertAlreadyExistsError()
    cy.screenshot('AlreadyExistsError')
  })
})