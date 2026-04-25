class DashboardPage {
  getDashboardHeading() {
    return cy.contains('h1', 'Dashboard')
  }

  getSignOutButton() {
    return cy.contains('button', 'Sign Out')
  }

  signOut() {
    this.getSignOutButton().click()
  }
}

export default DashboardPage