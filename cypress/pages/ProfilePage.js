// cypress/pages/ProfilePage.js

class ProfilePage {
  // Profile section
  openProfile() {
    cy.contains('button', 'Profile').click();
  }

  setUsername(username) {
    cy.get('#profile-username').clear().type(username);
  }

  setName(name) {
    cy.get('#profile-name').clear().type(name);
  }

  savePersonalInfo() {
    cy.contains('button', 'Save Personal Info')
      .should('be.visible')
      .click();
  }

  // Organization section
  setOrganizationName(orgName) {
    cy.get('#profile-orgName').clear().type(orgName);
  }

  setPopulation(population) {
    cy.get('#profile-population').clear().type(population);
  }

  selectOrganizationType(type) {
    cy.get('button[role="combobox"]').click();
    cy.contains('div', type).click();
  }

  saveOrganizationInfo() {
    cy.contains('button', 'Save Organization Info')
      .should('be.visible')
      .click();
  }

  // Password section
  setNewPassword(password) {
    cy.get('#new-password').clear().type(password);
    cy.get('#confirm-password').clear().type(password);
  }

  changePassword() {
    cy.contains('button', 'Change Password')
      .scrollIntoView() // safer than force
      .click({ force: true });
  }
  asserttoast(){
    cy.get('div[role="status"]')  // select the toast container
  .should('be.visible')
  .and('contain.text', 'Password changed successfully');
  }
}

export default ProfilePage;