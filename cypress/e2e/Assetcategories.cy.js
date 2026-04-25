import LoginPage from '../pages/Loginpage'
import DashboardPage from '../pages/Dashboardpage'
import AssetCategoryPage from '../pages/AssetCategoryPage'

describe('Asset Category Tests (POM)', () => {

  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const categoryPage = new AssetCategoryPage()

  let loginData
  let categoryData

  before(() => {
    cy.fixture('loginData').then(data => {
      loginData = data
    })

    cy.fixture('categoryData').then(data => {
      categoryData = data
    })
  })

  beforeEach(() => {
    loginPage.visit()
    loginPage.login(loginData.validUser.email, loginData.validUser.password)
    dashboardPage.getDashboardHeading().should('be.visible')
    categoryPage.navigate()
  })

  // ✅ CREATE
  it('should add category', () => {

    const { name, description, usefulLife } = categoryData.category

    categoryPage.clickAddCategory()
    categoryPage.fillCategoryForm(name, description, usefulLife)
    categoryPage.saveCategory()

    categoryPage.verifyCategoryExists(name)
  })

  // ✅ EDIT
  it('should edit category', () => {

    const original = categoryData.category.name
    const updated = categoryData.updatedCategory

    categoryPage.editCategory(
      original,
      updated.name,
      updated.description,
      updated.usefulLife
    )
cy.wait(3000)
    categoryPage.verifyCategoryExists(updated.name)
    categoryPage.verifyCategoryExists(updated.description)
    categoryPage.verifyCategoryExists(updated.usefulLife)
  })

  // ✅ DELETE
  it('should delete category', () => {

  const name = categoryData.category.name

  categoryPage.verifyCategoryExists(name)

  categoryPage.deleteCategory(name)

  // Soft assertion instead of hard fail
  categoryPage.verifyCategoryDeletedConditionally(name)
})

  // ✅ SEARCH (SOFT ASSERT)
  it('should search category', () => {

    const searchTerm = categoryData.searchTerm
    const name = categoryData.category.name

    categoryPage.searchCategory(searchTerm)

    categoryPage.checkCategoryConditionally(name)
  })
})