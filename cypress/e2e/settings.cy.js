import LoginPage from '../pages/Loginpage'
import ConditionPage from '../pages/conditionPage'

describe('Condition Tests (POM Clean)', () => {

  const loginPage = new LoginPage()
  const conditionPage = new ConditionPage()
  let loginData
  let conditionData

  before(() => {
    cy.fixture('loginData').then(data => loginData = data)
    cy.fixture('conditionData').then(data => conditionData = data)
  })

  beforeEach(() => {
    loginPage.visit()
    loginPage.login(loginData.validUser.email, loginData.validUser.password)
  })

  it('should add a new condition', () => {
    conditionPage.visitSettings()
    conditionPage.fillConditionForm(conditionData.newCondition)
    conditionPage.clickAdd()
    conditionPage.assertRowExists(conditionData.newCondition.name)
  })

  it('should edit an existing condition', () => {
    conditionPage.visitSettings()
    conditionPage.editRow(conditionData.newCondition.name, conditionData.updatedCondition)
    conditionPage.assertRowExists(conditionData.updatedCondition.name)
  })

  it('should delete a condition', () => {
    conditionPage.visitSettings()
    conditionPage.clickDeleteRow(conditionData.updatedCondition.name)
    cy.contains('td', conditionData.updatedCondition.name).should('not.exist')
  })
})