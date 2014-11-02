// // add tests to this file using the Nightwatch.js API
// // http://nightwatchjs.org/api
//
// module.exports = {
//   "My Profile" : function (client) {
//     client
//       .url("http://localhost:3000")
//
//       .waitForElementVisible("body", 1000)
//       .verify.elementPresent('#landingPage')
//       .verify.elementPresent('#signInLink')
//
//       .click("#signInLink").pause(200)
//
//       .waitForElementVisible("#entrySignInPage", 1000)
//       .verify.elementPresent("#emailInput")
//       .verify.elementPresent("#passwordInput")
//       .verify.elementPresent("#entrySignInButton")
//
//       .setValue("#emailInput", "sysadmin")
//       .setValue("#passwordInput", "sysadmin321$")
//
//       .click("#entrySignInButton")
//       .pause(200)
//       .waitForElementVisible("#homePage", 10000)
//
//       // open the menu
//       .waitForElementVisible("#northeastDropDownLink", 1000)
//       .click("#northeastDropDownLink")
//       //.pause(500)
//       .waitForElementVisible("#northeastDropDownMenu", 2000)
//
//       .verify.elementPresent('#userProfileLink')
//       .verify.containsText("#userProfileLink", "Profile")
//
//       // click user profile link
//       .click("#userProfileLink")
//       .pause(200)
//       .waitForElementVisible("#myProfilePage", 1000)
//
//       .verify.elementPresent('#editProfileButton')
//       .verify.containsText('#editProfileButton', "Edit Profile")
//
//       .verify.elementPresent('#profileAvatar')
//
//       .verify.elementPresent('#profileFullName')
//       .verify.elementPresent('#profileFullNameLabel')
//       .verify.elementPresent('#profileUserRole')
//       .verify.elementPresent('#profileUserRoleLabel')
//
//       .verify.elementPresent('#profileSelectedStudyLabel')
//       .verify.elementPresent('#profileSelectedStudyText')
//       .verify.elementPresent('#profileSelectedStudyIdLabel')
//       .verify.elementPresent('#profileSelectedStudyIdText')
//
//       .verify.elementPresent('#profileOrganizationLabel')
//       .verify.elementPresent('#profileOrganizationText')
//       .verify.elementPresent('#profileOrganizationIdLabel')
//       .verify.elementPresent('#profileOrganizationIdText')
//
//       .verify.containsText('#profileUserRole', "SysAdmin")
//
//       .verify.containsText('#profileFullNameLabel', "Full Name")
//       .verify.containsText('#profileUserRoleLabel', "Role")
//       .verify.containsText('#profileSelectedStudyLabel', "Selected Study")
//       .verify.containsText('#profileOrganizationLabel', "Sponsor Name")
//
//       .verify.containsText('#profileFullName', "System Administrator")
//       .verify.containsText('#profileUserRole', "SysAdmin")
//
//       // click terms of service
//       .click("#editProfileButton")
//       .pause(200)
//       .waitForElementVisible("#userEditPage", 1000)
//
//       // userEditPage
//       .waitForElementVisible("#userEditPage", 1000)
//       .pause(500)
//       .verify.visible('#userEditPageTitle')
//       .verify.containsText("#userEditPageTitle", "Edit User")
//
//       .verify.visible('#userEditForm')
//
//       .verify.visible('#userAvatarImage')
//       .verify.cssClassPresent('#userAvatarImage', 'img-circle')
//       .verify.cssClassPresent('#userAvatarImage', 'avatar')
//       .verify.attributeEquals('#userAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')
//
//       .verify.visible('#profileUsernameLabel')
//       .verify.visible('#profileEmailLabel')
//       .verify.visible('#profileNameLabel')
//       .verify.visible('#profileTitleLabel')
//       .verify.visible('#findOrganizationButtonLabel')
//       .verify.visible('#findRoleButton')
//       .verify.visible('#profileAvatarLabel')
//       .verify.visible('#profilePhoneLabel')
//       .verify.visible('#profileWebsiteLabel')
//       .verify.visible('#profileAddressLabel')
//       .verify.visible('#profileCityLabel')
//       .verify.visible('#profileStateLabel')
//       .verify.visible('#profileZipLabel')
//
//       .verify.visible('#profileUsernameInput')
//       .verify.visible('#profileEmailInput')
//       .verify.visible('#profileNameInput')
//       .verify.visible('#profileTitleInput')
//       .verify.visible('#findClientButton')
//       .verify.visible('#findRoleButton')
//       .verify.visible('#profileAvatarInput')
//       .verify.visible('#profilePhoneInput')
//       .verify.visible('#profileWebsiteInput')
//       .verify.visible('#profileAddressInput')
//       .verify.visible('#profileCityInput')
//       .verify.visible('#profileStateInput')
//       .verify.visible('#profileZipInput')
//
//       .verify.attributeEquals('#profileUsernameInput', "value", "sysadmin")
//       .verify.attributeEquals('#profileEmailInput', "value", "sysadmin@clinical-trials.meteor.com")
//       .verify.attributeEquals('#profileNameInput', "value", "System Administrator")
//       .verify.attributeEquals('#profileTitleInput', "value", "")
//       .verify.containsText('#findRoleButton', "SysAdmin")
//       .verify.attributeEquals('#userAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')
//       .verify.containsText('#profilePhoneInput', "")
//       .verify.containsText('#profileWebsiteInput', "")
//       .verify.containsText('#profileAddressInput', "")
//       .verify.containsText('#profileCityInput', "")
//       .verify.containsText('#profileStateInput', "")
//       .verify.containsText('#profileZipInput', "")
//
//       .end();
//   }
// };
