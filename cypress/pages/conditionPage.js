class ConditionPage {
  visitSettings() {
    cy.contains('button', 'Settings').click()
    cy.contains('button','Add Condition').click()
  }

  fillConditionForm({ name, value, quantity, color }) {
    if (name) cy.get("input[placeholder='e.g. Very Good']").clear().type(name)
    if (value) cy.get("input[placeholder='e.g. 100']").clear().type(value)
    if (quantity) cy.get("input[placeholder='e.g. 5']").clear().type(quantity)
    if (color) {
      cy.contains('label', 'Color')
        .parent()
        .find('select')
        .select(color)
    }
  }

  clickAdd() {
    cy.contains('button', 'Add').click()
  }

  clickUpdate() {
    cy.contains('button', 'Update').click()
  }

  clickDeleteRow(rowText) {
    cy.contains('td', rowText)
      .closest('tr')
      .find('button:has(svg.lucide-trash2)')
      .click()
    cy.contains('button', 'Delete').click()
  }

  editRow(rowText, { name, value, quantity, color }) {
    cy.contains('td', rowText)
      .closest('tr')
      .within(() => {
        cy.get('button').filter(':has(svg.lucide-pencil)').click({ force: true })
      })
    this.fillConditionForm({ name, value, quantity, color })
    this.clickUpdate()
  }

  assertRowExists(rowText) {
    cy.get('table tbody tr td:first-child').should('contain.text', rowText)
  }
}

export default ConditionPage