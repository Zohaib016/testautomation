import LoginPage from '../pages/Loginpage'
import ProfilePage from '../pages/ProfilePage'  // <-- corrected import

describe('Asset Tests (POM Clean)', () => {

  const loginPage = new LoginPage()
  const profilePage = new ProfilePage()   // <-- instantiate as profilePage

  let loginData
  let profileData  // <-- rename assetData to profileData to match fixture

  before(() => {
    cy.fixture('loginData').then(data => loginData = data)
    cy.fixture('profileData').then(data => profileData = data) // <-- corrected
  })

  beforeEach(() => {
    loginPage.visit()
    loginPage.login(loginData.validUser.email, loginData.validUser.password)
  })

  it('Update Profile, Organization and Password', () => {
    // Profile
    profilePage.openProfile();
    profilePage.setUsername(profileData.profile.username);
    profilePage.setName(profileData.profile.name);
    profilePage.savePersonalInfo();

    // Organization
    profilePage.setOrganizationName(profileData.organization.orgName);
    profilePage.setPopulation(profileData.organization.population);
    profilePage.selectOrganizationType(profileData.organization.type);
    profilePage.saveOrganizationInfo();

    // Password
    profilePage.setNewPassword(profileData.password.new);
    profilePage.changePassword()
    //profilePage.asserttoast()
  });
})