// // add tests to this file using the Nightwatch.js API
// // http://nightwatchjs.org/api
//
//
// module.exports = {
//   "Sponsors Workflow" : function (client) {
//
//     var date = new Date();
//     var currentYear = date.getFullYear();
//     var currentHour = date.getHours();
//     var currentMinutes = date.getMinutes();
//     if(currentHour > 12){
//       currentHour = currentHour - 12;
//     }
//
//
//     client.url("http://localhost:3000")
//
//
//       //========================================================================
//       // LANDING PAGE
//
//       .waitForElementVisible("body", 1000)
//       .verify.elementPresent('#landingPage')
//       .verify.elementPresent('#signInLink')
//       .click("#signInLink").pause(200)
//
//       //========================================================================
//       // SIGN IN PAGE
//
//       .waitForElementVisible("#entrySignInPage", 1000)
//         .verify.elementPresent("#emailInput")
//         .verify.elementPresent("#passwordInput")
//         .verify.elementPresent("#entrySignInButton")
//       .setValue("#emailInput", "sysadmin")
//       .setValue("#passwordInput", "sysadmin321$")
//       .click("#entrySignInButton")
//       .pause(1000)
//
//
//       //========================================================================
//       // INTRO/HOME PAGE
//
//       .waitForElementVisible("#homePage", 1000)
//       .verify.elementPresent("#sponsorsTile")
//       .click('#sponsorsTile')
//
//       //========================================================================
//       // USERS LIST PAGE
//
//       // test that the page contains search and control elements
//       .waitForElementVisible("#sponsorsListPage", 1000)
//         .verify.elementPresent('#sponsorsListPageTitle')
//         .verify.containsText("#sponsorsListPageTitle", "Sponsors")
//
//         .verify.elementPresent('.searchColumn')
//         .verify.elementPresent('#sponsorsSearchInput')
//         .verify.containsText("#sponsorsSearchInput", "")
//
//         .verify.elementPresent('.newRecordColumn')
//         .verify.elementPresent('#newUserButton')
//         .verify.containsText("#newUserButton", "NEW SPONSOR")
//
//       // test the table
//       .verify.elementPresent('#sponsorsTable')
//         .verify.elementPresent('#sponsorsTableUsernameColumn')
//         .verify.containsText("#sponsorsTableUsernameColumn", "Username")
//         .verify.elementPresent('#sponsorsTableCreatedAtColumn')
//         .verify.containsText("#sponsorsTableCreatedAtColumn", "CreatedAt")
//         .verify.elementPresent('#sponsorsTableLastLoginColumn')
//         .verify.containsText("#sponsorsTableLastLoginColumn", "Last Login")
//         .verify.elementPresent('#sponsorsTableLastLoginColumn')
//         .verify.containsText("#sponsorsTableFullNameColumn", "Full Name")
//         .verify.elementPresent('#sponsorsTableRoleColumn')
//         .verify.containsText("#sponsorsTableRoleColumn", "Role")
//         .verify.elementPresent('#sponsorsTableCompanyColumn')
//         .verify.containsText("#sponsorsTableCompanyColumn", "Company")
//         .verify.elementPresent('#sponsorsTableEmailColumn')
//         .verify.containsText("#sponsorsTableEmailColumn", "Email")
//
//
//       // test searching for 'sysadmin' sponsorname
//       .setValue("#sponsorsSearchInput", "sysadmin")
//
//       .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img')
//         .verify.cssClassPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'img-circle')
//         .verify.cssClassPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'avatar')
//         .verify.cssClassPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'hidden-phone')
//         .verify.attributeEquals('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'src', 'http://localhost:3000/images/icons/AdminClouds.jpg')
//
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(1)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(2)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(4)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(5)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(6)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(7)')
//
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(1)', 'sysadmin')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(2)', currentYear)
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)', currentHour)
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)', currentMinutes)
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(4)', 'System Administrator')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(5)', 'SysAdmin')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(6)', 'Thinaire')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(7)', 'sysadmin@thinaire.net')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(8)', 'active')
//
//         .click('#sponsorsTable .sponsorListItem:first-child td:nth-child(8) .label').pause(300)
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(8)', 'Inactive')
//
//       // test searching for 'johndoe' sponsor
//       .clearValue('#sponsorsSearchInput')
//       .setValue("#sponsorsSearchInput", "johndoe")
//       .pause(50)
//
//       .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(1)', 'johndoe')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(2)', currentYear)
//         //.verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)', currentHour)
//         //.verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)', currentMinutes)
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(4)', 'John Doe')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(5)', 'User')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(6)', 'ACME, Inc')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(7)', 'johndoe@acme.com')
//
//       // test searching for 'janedoe' sponsor
//       .clearValue('#sponsorsSearchInput')
//       .setValue("#sponsorsSearchInput", "janedoe")
//       .pause(50)
//
//       .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(1)', 'janedoe')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(2)', currentYear)
//         //.verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)', currentHour)
//         //.verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)', currentMinutes)
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(4)', 'Jane Doe')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(5)', 'User')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(6)', 'Thinaire')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(7)', 'janedoe@thinaire.net')
//
//       .click("#newUserButton")
//       .pause(1000)
//
//       //========================================================================
//       // NEW USER PAGE
//
//       .waitForElementVisible("#sponsorEditPage", 1000)
//       .pause(100)
//       .verify.visible('#sponsorEditPageTitle')
//       .verify.containsText("#sponsorEditPageTitle", "Basic Info")
//
//       .verify.visible('#sponsorEditForm')
//
//       .verify.visible('#sponsorAvatarImage')
//       .verify.cssClassPresent('#sponsorAvatarImage', 'img-circle')
//       .verify.cssClassPresent('#sponsorAvatarImage', 'avatar')
//       .verify.attributeEquals('#sponsorAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')
//
//
//       .verify.visible('#profileUsernameLabel')
//       .verify.visible('#profileEmailLabel')
//       .verify.visible('#profileNameLabel')
//       .verify.visible('#profileTitleLabel')
//       .verify.visible('#findCompanyButton')
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
//       .verify.visible('#findCompanyButton')
//       .verify.visible('#findRoleButton')
//       .verify.visible('#profileAvatarInput')
//       .verify.visible('#profilePhoneInput')
//       .verify.visible('#profileWebsiteInput')
//       .verify.visible('#profileAddressInput')
//       .verify.visible('#profileCityInput')
//       .verify.visible('#profileStateInput')
//       .verify.visible('#profileZipInput')
//
//       .verify.containsText('#profileUsernameInput', "")
//       .verify.containsText('#profileEmailInput', "")
//       .verify.containsText('#profileNameInput', "")
//       .verify.containsText('#profileTitleInput', "")
//       .verify.attributeEquals('#findCompanyButton', "value", "Please select a company/employer.")
//       .verify.attributeEquals('#findRoleButton', "value", "Please select a sponsor role.")
//       .verify.attributeEquals('#sponsorAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')
//       .verify.containsText('#profilePhoneInput', "")
//       .verify.containsText('#profileWebsiteInput', "")
//       .verify.containsText('#profileAddressInput', "")
//       .verify.containsText('#profileCityInput', "")
//       .verify.containsText('#profileStateInput', "")
//       .verify.containsText('#profileZipInput', "")
//
//
//       .setValue('#profileUsernameInput', "kermitfrog")
//       .setValue('#profileEmailInput', "kermit@thinaire.net")
//       .setValue('#profileNameInput', "Kermit T. Frog")
//       .setValue('#profileTitleInput', "Frog")
//       .setValue('#profilePhoneInput', "888-555-1234")
//       .clearValue('#profileWebsiteInput')
//       .setValue('#profileWebsiteInput', "http://en.wikipedia.org/wiki/Kermit_the_Frog")
//       .clearValue('#profileAvatarInput')
//       .setValue('#profileAvatarInput', "http://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg")
//       .setValue('#profileAddressInput', "123 Pond Lane")
//       .setValue('#profileCityInput', "Swampville")
//       .setValue('#profileStateInput', "Louisiana")
//       .setValue('#profileZipInput', "71432")
//
//         //-----------------------------------------------------------
//         // SPONSOR SEARCH MODAL
//
//         .click("#findCompanyButton").pause(500)
//         //.waitForElementVisible('#sponsorSearchModal', 1000)
//         .verify.elementPresent('#sponsorSearchModalTitle')
//         .verify.elementPresent('#sponsorSearchModalInput')
//         .verify.elementPresent('#sponsorSearchModalResults')
//         .verify.elementPresent('#modalOkButton')
//         .clearValue('#sponsorSearchModalInput')
//         .setValue('#sponsorSearchModalInput', "ACME")
//         .click("#sponsorSearchModalResults .list-group-item:nth-child(2)").pause(500)
//         .verify.attributeEquals('#findCompanyButton', "value", "ACME, Inc.")
//
//         //-----------------------------------------------------------
//         // SELECT ROLE MODAL
//
//         .click("#findRoleButton").pause(300)
//         //.waitForElementVisible('#sponsorSearchModal', 1000)
//         .verify.elementPresent('#selectRoleModalTitle')
//         .verify.elementPresent('#selectRoleModalInput')
//         .verify.elementPresent('#selectRoleModalResults')
//         .verify.elementPresent('#modalOkButton')
//         .setValue('#selectRoleModalInput', "User")
//         .click("#selectRoleModalResults .list-group-item:first-child").pause(500)
//         .verify.attributeEquals('#findRoleButton', "value", "User")
//
//       .verify.elementPresent('#saveBasicInfoButton')
//       .click("#saveBasicInfoButton").pause(500)
//       //.click("#submitProfileInfoButton").pause(500)
//
//       //========================================================================
//       // SET PASSWORD
//
//       .verify.elementPresent('#sponsorSecurityCard')
//
//         .verify.elementPresent('#resetPasswordTitle')
//         .verify.elementPresent('#resetPasswordMessage')
//
//         .verify.elementPresent('#newPasswordLabel')
//         .verify.elementPresent('#confirmPasswordLabel')
//         .verify.elementPresent('#newPasswordInput')
//         .verify.elementPresent('#confirmPasswordInput')
//
//         .verify.elementPresent('#updatePasswordButton')
//
//         .setValue('#newPasswordInput', 'FrogsRule')
//         .setValue('#confirmPasswordInput', 'FrogsRule')
//
//         .click('#updatePasswordButton').pause(1000)
//
//       //.verify.elementPresent('#resetPasswordSuccessfulAlert')
//       .verify.elementPresent('#resetPasswordSuccessfulMessage')
//       .verify.containsText('#resetPasswordSuccessfulMessage', "Success!")
//
//       .waitForElementVisible("#sidebarTemplate", 1000)
//         .verify.elementPresent('#sidebarNav')
//         .verify.elementPresent('#sidebarMenu')
//         .verify.elementPresent('#sidebarMenuUsersLink')
//       .click("#sidebarMenuUsersLink")
//       .pause(1000)
//
//
//       //========================================================================
//       // USERS LIST PAGE
//
//       // test that the page contains search and control elements
//       .verify.elementPresent("#sponsorsListPage")
//       .waitForElementVisible("#sponsorsTable", 1000)
//
//       // test searching for 'kermitfrog' sponsorname
//       .clearValue('#sponsorsSearchInput')
//       .setValue("#sponsorsSearchInput", "kermitfrog")
//
//       .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img')
//         .verify.cssClassPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'img-circle')
//         .verify.cssClassPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'avatar')
//         .verify.cssClassPresent('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'hidden-phone')
//         .verify.attributeEquals('#sponsorsTable .sponsorListItem:first-child td:first-child img', 'src', 'http://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg')
//
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(1)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(2)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(4)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(5)')
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:nth-child(6)')
//
//         .verify.elementPresent('#sponsorsTable .sponsorListItem:first-child td:first-child')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(1)', 'kermitfrog')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(2)', currentYear)
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(3)', "---")
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(4)', 'Kermit T. Frog')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(5)', 'User')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(6)', 'ACME, Inc.')
//         .verify.containsText('#sponsorsTable .sponsorListItem:first-child td:nth-child(7)', 'kermit@thinaire.net')
//
//       .click('#sponsorsTable .sponsorListItem:first-child')
//
//       //========================================================================
//       // USERS PROFILE PAGE
//
//       .waitForElementVisible("#sponsorProfilePage", 1000)
//
//
//         .verify.visible('#profileUsername')
//         .verify.visible('#profileUserIdLabel')
//         .verify.visible('#profileUserId')
//         .verify.visible('#profileBiographyLabel')
//         .verify.visible('#profileBiography')
//         .verify.visible('#profileSelectedCampaignLabel')
//         .verify.visible('#profileSelectedCampaign')
//         .verify.visible('#profileSelectedCampaignIdLabel')
//         .verify.visible('#profileSelectedCampaignId')
//         .verify.visible('#profileEmployerLabel')
//         .verify.visible('#profileEmployer')
//         .verify.visible('#profileEmployerIdLabel')
//         .verify.visible('#profileEmployerId')
//         .verify.visible('#profileAvatar')
//         .verify.visible('#editProfileButton')
//         .verify.visible('#deleteProfileButton')
//
//         .verify.containsText('#profileUserIdLabel', "User Id:")
//         .verify.containsText('#profileFullNameLabel', "Full Name")
//         .verify.containsText('#profileBiographyLabel', "Biography")
//         .verify.containsText('#profileSelectedCampaignLabel', "Selected Campaign")
//         .verify.containsText('#profileSelectedCampaignIdLabel', "Selected Campaign Id")
//         .verify.containsText('#profileEmployerLabel', "Employer Name")
//         .verify.containsText('#profileEmployerIdLabel', "Employer Id")
//
//         .verify.containsText('#profileUsername', "kermitfrog")
//         //.verify.containsText('#profileUserId', "")
//         .verify.containsText('#profileFullName', "Kermit T. Frog")
//         .verify.containsText('#profileBiography', "")
//         .verify.containsText('#profileSelectedCampaign', "")
//         .verify.containsText('#profileEmployer', "ACME, Inc.")
//         //.verify.containsText('#profileEmployerId', "")
//         .verify.attributeEquals('#profileAvatar', "src", "http://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg")
//
//         .verify.containsText('#editProfileButton', "Edit Profile")
//         .verify.containsText('#deleteProfileButton', "Delete")
//
//         .click('#deleteProfileButton')
//
//       .waitForElementVisible('#deleteUserModal', 1000)
//         .verify.visible('#deleteUserModal')
//         .verify.visible('#deleteUserModalTitle')
//         .verify.visible('#deleteUserModalMessage')
//         .verify.visible('#deleteUserModalInput')
//         .verify.visible('#confirmDeleteUserButton')
//         .verify.visible('#cancelDeleteUserButton')
//
//       .click('#cancelDeleteUserButton').pause(300)
//       .waitForElementNotVisible('#deleteUserModal', 500)
//
//       .click('#deleteProfileButton')
//       .waitForElementVisible('#deleteUserModal', 1000)
//
//       .clearValue('#deleteUserModalInput')
//       .setValue('#deleteUserModalInput', "kermitfrog")
//       .click('#confirmDeleteUserButton').pause(300)
//
//       .waitForElementNotVisible('#deleteUserModal', 1000).pause(500)
//
//       //========================================================================
//       // USERS LIST PAGE
//
//       .waitForElementVisible("#sponsorsListPage", 1000)
//       .setValue("#sponsorsSearchInput", "kermitfrog")
//       .verify.elementNotPresent('#sponsorsTable .sponsorListItem:first-child')
//
//       .end();
//   }
// };
