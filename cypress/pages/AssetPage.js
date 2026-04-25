class AssetPage {

  clickAssetsMenu() {
    cy.contains('button', 'Assets').click();
  }

  clickAddAsset() {
    cy.contains('button', 'Add Asset').click();
    cy.get('body').should('not.have.css', 'pointer-events', 'none');
  }

  enterAssetName(name) {
    cy.get("input[placeholder='e.g. Main Building']", { timeout: 10000 })
      .should('exist')
      .clear({ force: true })
      .type(name, { force: true });
  }

  selectCategory() {
    cy.get('button[role="combobox"]').click();
    cy.get('[aria-labelledby="radix-:rn:"]').click(); // dynamic id fix
  }

  enterYear(year) {
    cy.get("input[placeholder='e.g. 2026']").clear().type(year);
  }

  enterValue(value) {
    cy.get("input[placeholder='e.g. 50,000']").clear().type(value);
  }

  enterDepartment(dep) {
    cy.get("input[placeholder='e.g. Public Works']").clear().type(dep);
  }

  enterType(type) {
    cy.get("input[placeholder='e.g. Water Supply']").clear().type(type);
  }

  clickSave() {
    cy.contains('button', 'Save').click();
  }

  clickUpdate() {
    cy.contains('button', 'Update').click();
  }

  verifyAssetExists(name) {
    cy.get('table tbody tr td:first-child')
      .should('contain.text', name);
  }

  editAsset(oldName) {
    cy.contains('table tbody tr td', oldName)
      .closest('tr')
      .within(() => {
        cy.get('button')
          .filter(':has(svg.lucide-pencil)')
          .click({ force: true });
      });
  }

  deleteAsset(name) {
    cy.contains('td', name)
      .closest('tr')
      .find('button:has(svg.lucide-trash2)')
      .click();

    cy.contains('button', 'Delete').click();
  }

  searchAsset(name) {
    cy.get("input[placeholder='Search assets...']")
      .clear()
      .type(name);
  }
}

export default AssetPage;