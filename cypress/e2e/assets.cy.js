import LoginPage from '../pages/Loginpage'
import AssetPage from '../pages/AssetPage'

describe('Asset Tests (POM Clean)', () => {

  const loginPage = new LoginPage()
  const assetPage = new AssetPage()

  let loginData
  let assetData

  before(() => {
    cy.fixture('loginData').then(data => loginData = data)
    cy.fixture('assetData').then(data => assetData = data)
  })

  beforeEach(() => {
    loginPage.visit()
    loginPage.login(loginData.validUser.email, loginData.validUser.password)
    assetPage.clickAssetsMenu()
  })

  it('Add Asset', () => {
    const data = assetData.add

    assetPage.clickAddAsset()
    assetPage.enterAssetName(data.name)
    assetPage.selectCategory()
    assetPage.enterYear(data.year)
    assetPage.enterValue(data.value)
    assetPage.enterDepartment(data.department)
    assetPage.enterType(data.type)
    assetPage.clickSave()

    assetPage.verifyAssetExists(data.name)
  })

  it('Edit Asset', () => {
    const data = assetData.edit

    assetPage.editAsset(data.oldName)

    assetPage.enterAssetName(data.newName)
    assetPage.selectCategory()
    assetPage.enterYear(data.year)
    assetPage.enterValue(data.value)
    assetPage.enterDepartment(data.department)
    assetPage.enterType(data.type)

    assetPage.clickUpdate()
    assetPage.verifyAssetExists(data.newName)
  })

  it('Delete Asset', () => {
    const name = assetData.delete.name

    assetPage.deleteAsset(name)
    cy.contains('td', name).should('not.exist')
  })

  it('Search Asset', () => {
    const name = assetData.search.name

    assetPage.searchAsset(name)

    cy.get('table tbody').then(($tbody) => {
      if ($tbody.find(`td:contains("${name}")`).length > 0) {
        cy.contains('td', name).should('exist')
      }
    })
  })

  it('Asset Full Flow (Stable)', () => {
  const name = 'Asset-' + Date.now();
  const updated = name + '-Updated';

  // Add
  assetPage.clickAddAsset()
  assetPage.enterAssetName(name)
  assetPage.selectCategory()
  assetPage.enterYear(assetData.common.year)
  assetPage.enterValue(assetData.common.value)
  assetPage.enterDepartment(assetData.common.department)
  assetPage.enterType(assetData.common.type)
  assetPage.clickSave()
  assetPage.verifyAssetExists(name)

  // Edit
  assetPage.editAsset(name)
  assetPage.enterAssetName(updated)
  assetPage.clickUpdate()
  assetPage.verifyAssetExists(updated)

  // Search
  assetPage.searchAsset(updated)
  cy.contains('td', updated).should('exist')

  // Delete
  assetPage.deleteAsset(updated)
  cy.contains('td', updated).should('not.exist')
})
})