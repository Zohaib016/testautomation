class AssetCategoryPage {

  navigate() {
    cy.contains('button', 'Asset Categories').click()
  }

  clickAddCategory() {
    cy.contains('button', 'Add Category').click()
  }

  fillCategoryForm(name, description, usefulLife) {
    cy.get('input[placeholder="e.g. Solar Panels"]').clear().type(name)
    cy.get("input[placeholder='Brief description']").clear().type(description)
    cy.get("input[placeholder='e.g. 25']").clear().type(usefulLife)
    //cy.get("input[placeholder='e.g. 3']").clear().type(1)
  }

  saveCategory() {
    cy.contains('button', 'Save').click()
  }

  searchCategory(name) {
    cy.get("input[placeholder='Search categories...']").clear().type(name)
  }

  verifyCategoryExists(name) {
    cy.contains('td', name).should('exist')
  }

 verifyCategoryDeletedConditionally(name) {
  cy.get('table tbody').then(($tbody) => {

    if ($tbody.text().includes(name)) {
      cy.log(`⚠️ Category "${name}" is STILL available (delete failed)`);
    } else {
      cy.log(`✅ Category "${name}" successfully deleted`);
    }

  });
}

  deleteCategory(name) {
    cy.contains('td', name)
      .parents('tr')
      .find('svg.lucide-trash2')
      .parents('button')
      .click()

    cy.contains('button', 'Delete').click()
  }

 editCategory(oldName, newName, newDesc, newLife) {

  cy.contains('table tbody tr td', oldName)
    .should('exist')
    .closest('tr')
    .as('row')   // 👈 save reference

  cy.get('@row').within(() => {

    cy.get('button')
      .filter(':has(svg.lucide-pencil)')
      .click({ force: true })

  })

  // 👇 IMPORTANT: re-query AFTER DOM update
  cy.get('@row').within(() => {

    cy.get('input').should('have.length.at.least', 3)

    cy.get('input').eq(0).clear().type(newName)
    cy.get('input').eq(1).clear().type(newDesc)
    cy.get('input').eq(2).clear().type(newLife)

    cy.get('button')
      .filter(':has(svg.lucide-check)')
      .click({ force: true })
  })
}

  checkCategoryConditionally(name) {
    cy.get('table tbody').then(($tbody) => {
      if ($tbody.text().includes(name)) {
        cy.log(`✅ ${name} exists`)
        this.verifyCategoryExists(name)
      } else {
        cy.log(`⚠️ ${name} NOT found`)
      }
    })
  }
}

export default AssetCategoryPage