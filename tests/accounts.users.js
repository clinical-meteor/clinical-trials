// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  "Users Workflow" : function (client) {

    var date = new Date();
    var currentYear = date.getFullYear();
    var currentHour = date.getHours();
    var currentMinutes = date.getMinutes();
    if(currentHour > 12){
      currentHour = currentHour - 12;
    }


    client.url("http://localhost:3000")


      //========================================================================
      // LANDING PAGE

      .waitForElementVisible("body", 1000)
      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')

      .click("#signInLink").pause(200)
      .pause(1000)

      //========================================================================
      // SIGN IN PAGE

      .waitForElementVisible("#entrySignInPage", 1000)
        .verify.elementPresent("#emailInput")
        .verify.elementPresent("#passwordInput")
        .verify.elementPresent("#entrySignInButton")
      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")
      .click("#entrySignInButton")
      .pause(1000)


      //========================================================================
      // INTRO/HOME PAGE

      .verify.elementPresent("#activeStudiesTile")
      .verify.elementPresent("#formBuilderTile")
      .verify.elementPresent("#savedFormsTile")
      .verify.elementPresent("#collectedDataTile")
      .verify.elementPresent("#studiesTile")
      .verify.elementPresent("#sponsorsTile")
      .verify.elementPresent("#usersTile")
      .verify.elementPresent("#subjectsTile")
      .verify.elementPresent("#commentsTile")
      .verify.elementPresent("#auditTile")

      .click('#usersTile')

      //========================================================================
      // USERS LIST PAGE

      // test that the page contains search and control elements
      .waitForElementVisible("#usersListPage", 1000)

        .verify.elementPresent('#usersSearchInput')
        .verify.containsText("#usersSearchInput", "")

        .verify.elementPresent('#newUserButton')
        .verify.containsText("#newUserButton", "Create User")

      // test the table
      .verify.elementPresent('#usersTable')
        .verify.elementPresent('#usersTableUsernameColumn')
        .verify.containsText("#usersTableUsernameColumn", "Username")
        .verify.elementPresent('#usersTableCreatedAtColumn')
        .verify.containsText("#usersTableCreatedAtColumn", "CreatedAt")
        .verify.containsText("#usersTableFullNameColumn", "Full Name")
        .verify.elementPresent('#usersTableRoleColumn')
        .verify.containsText("#usersTableRoleColumn", "Role")
        .verify.elementPresent('#usersTableCompanyColumn')
        .verify.containsText("#usersTableCompanyColumn", "Sponsor")
        .verify.elementPresent('#usersTableEmailColumn')
        .verify.containsText("#usersTableEmailColumn", "Email")


      // test searching for 'sysadmin' username
      .setValue("#usersSearchInput", "sysadmin")

      .verify.elementPresent('#usersTable .userListItem:first-child')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(1)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(2)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(3)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(4)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(5)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(6)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(7)')

        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', 'sysadmin')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', currentYear)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'System Administrator')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'SysAdmin')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'clinical-trials.meteor.com')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'sysadmin@clinical-trials.meteor.com')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(7)', 'active')

        .click('#usersTable .userListItem:first-child td:nth-child(7) .label').pause(300)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(7)', 'active')

      // test searching for 'johndoe' user
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", "johndoe")
      .pause(50)

      .verify.elementPresent('#usersTable .userListItem:first-child')
        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', 'johndoe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', currentYear)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'John Doe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'Reviewer')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'ACME Pharmaceuticals')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'johndoe@acme.com')

      // test searching for 'janedoe' user
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", "janedoe")
      .pause(50)

      .verify.elementPresent('#usersTable .userListItem:first-child')
        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', 'janedoe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', currentYear)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'Jane Doe')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'Data Entry')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'ACME Pharmaceuticals')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'janedoe@acme.com')

      .click("#newUserButton")
      .pause(1000)

      //========================================================================
      // NEW USER PAGE

      .waitForElementVisible("#userEditPage", 1000)
      .pause(100)
      .verify.visible('#userEditPageTitle')
      .verify.containsText("#userEditPageTitle", "Basic Info")

      .verify.visible('#userEditForm')

      .verify.visible('#userAvatarImage')
      .verify.cssClassPresent('#userAvatarImage', 'img-circle')
      .verify.cssClassPresent('#userAvatarImage', 'avatar')
      .verify.attributeEquals('#userAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')


      .verify.visible('#profileUsernameLabel')
      .verify.visible('#profileEmailLabel')
      .verify.visible('#profileNameLabel')
      .verify.visible('#profileTitleLabel')
      .verify.visible('#findSponsorButton')
      .verify.visible('#findRoleButton')
      .verify.visible('#profileAvatarLabel')
      .verify.visible('#profilePhoneLabel')
      .verify.visible('#profileWebsiteLabel')
      .verify.visible('#profileAddressLabel')
      .verify.visible('#profileCityLabel')
      .verify.visible('#profileStateLabel')
      .verify.visible('#profileZipLabel')

      .verify.visible('#profileUsernameInput')
      .verify.visible('#profileEmailInput')
      .verify.visible('#profileNameInput')
      .verify.visible('#profileTitleInput')
      .verify.visible('#findSponsorButton')
      .verify.visible('#findRoleButton')
      .verify.visible('#profileAvatarInput')
      .verify.visible('#profilePhoneInput')
      .verify.visible('#profileWebsiteInput')
      .verify.visible('#profileAddressInput')
      .verify.visible('#profileCityInput')
      .verify.visible('#profileStateInput')
      .verify.visible('#profileZipInput').pause(100)

      .verify.containsText('#profileUsernameInput', "")
      .verify.containsText('#profileEmailInput', "")
      .verify.containsText('#profileNameInput', "")
      .verify.containsText('#profileTitleInput', "")
      .verify.attributeEquals('#findSponsorButton', "value", "Please select a sponsor to be associated with.")
      .verify.attributeEquals('#findRoleButton', "value", "Please select a user role.")
      .verify.attributeEquals('#userAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')
      .verify.containsText('#profilePhoneInput', "")
      .verify.containsText('#profileWebsiteInput', "")
      .verify.containsText('#profileAddressInput', "")
      .verify.containsText('#profileCityInput', "")
      .verify.containsText('#profileStateInput', "")
      .verify.containsText('#profileZipInput', "")


      .setValue('#profileUsernameInput', "kermitfrog")
      .setValue('#profileEmailInput', "kermit@thinaire.net")
      .setValue('#profileNameInput', "Kermit T. Frog")
      .setValue('#profileTitleInput', "Frog")
      .setValue('#profilePhoneInput', "888-555-1234")
      .clearValue('#profileWebsiteInput')
      .setValue('#profileWebsiteInput', "http://en.wikipedia.org/wiki/Kermit_the_Frog")
      .clearValue('#profileAvatarInput')
      .setValue('#profileAvatarInput', "http://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg")
      .setValue('#profileAddressInput', "123 Pond Lane")
      .setValue('#profileCityInput', "Swampville")
      .setValue('#profileStateInput', "Louisiana")
      .setValue('#profileZipInput', "71432")

        //-----------------------------------------------------------
        // SPONSOR SEARCH MODAL

        .click("#findSponsorButton").pause(500)
        .waitForElementVisible('#sponsorSearchModal', 1000)
        .verify.elementPresent('#sponsorSearchModalTitle')
        .verify.elementPresent('#sponsorSearchModalInput')
        .verify.elementPresent('#sponsorSearchModalResults')
        .verify.elementPresent('#modalOkButton')
        .clearValue('#sponsorSearchModalInput')
        .setValue('#sponsorSearchModalInput', "ACME")
        .click("#sponsorSearchModalResults .list-group-item:nth-child(1)").pause(500)
        .verify.attributeEquals('#findSponsorButton', "value", "ACME Pharmaceuticals")

        //-----------------------------------------------------------
        // SELECT ROLE MODAL

        .click("#findRoleButton").pause(500)
        //.waitForElementVisible('#clientSearchModal', 1000)
        .verify.elementPresent('#selectRoleModalTitle')
        .verify.elementPresent('#selectRoleModalInput')
        .waitForElementVisible('#selectRoleModalResults', 1000).pause(500)
        .verify.elementPresent('#modalOkButton')
        .clearValue('#selectRoleModalInput')
        .setValue('#selectRoleModalInput', "Reviewer")
        .click("#selectRoleModalResults .list-group-item:first-child").pause(500)
        .verify.attributeEquals('#findRoleButton', "value", "Reviewer")

      .verify.elementPresent('#saveBasicInfoButton')
      .click("#saveBasicInfoButton").pause(500)
      //.click("#submitProfileInfoButton").pause(500)

      //========================================================================
      // SET PASSWORD

      .verify.elementPresent('#userSecurityCard')

        .verify.elementPresent('#resetPasswordTitle')
        .verify.elementPresent('#resetPasswordMessage')

        .verify.elementPresent('#newPasswordLabel')
        .verify.elementPresent('#confirmPasswordLabel')
        .verify.elementPresent('#newPasswordInput')
        .verify.elementPresent('#confirmPasswordInput')

        .verify.elementPresent('#updatePasswordButton')

        .setValue('#newPasswordInput', 'FrogsRule')
        .setValue('#confirmPasswordInput', 'FrogsRule')

        .click('#updatePasswordButton').pause(1000)

      //.verify.elementPresent('#resetPasswordSuccessfulAlert')
      .verify.elementPresent('#resetPasswordSuccessfulMessage')
      .verify.containsText('#resetPasswordSuccessfulMessage', "Success!")

      .click('#navbarBrandLink')
      .waitForElementVisible('#usersTile', 1000)
      .click('#usersTile')

      // .waitForElementVisible("#sidebarTemplate", 1000)
      //   .verify.elementPresent('#sidebarNav')
      //   .verify.elementPresent('#sidebarMenu')
      //   .verify.elementPresent('#sidebarMenuUsersLink')
      // .click("#sidebarMenuUsersLink")
      // .pause(1000)


      //========================================================================
      // USERS LIST PAGE

      // test that the page contains search and control elements
      .waitForElementVisible("#usersListPage", 1000)
      .verify.elementPresent('#usersTable')

      // test searching for 'kermitfrog' username
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", "kermitfrog")

      .verify.elementPresent('#usersTable .userListItem:first-child')
        // .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        // .verify.elementPresent('#usersTable .userListItem:first-child td:first-child img')
        // .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'img-circle')
        // .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'avatar')
        // .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'hidden-phone')
        // .verify.attributeEquals('#usersTable .userListItem:first-child td:first-child img', 'src', 'http://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg')

        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(1)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(2)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(3)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(4)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(5)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(6)')

        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', 'kermitfrog')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', currentYear)
        //.verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', "---")
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'Kermit T. Frog')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'Reviewer')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'ACME Pharmaceuticals')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'kermit@thinaire.net')

      .click('#usersTable .userListItem:first-child')

      //========================================================================
      // USERS PROFILE PAGE

      .waitForElementVisible("#userProfilePage", 1000)

        .verify.visible('#profileUsername')
        .verify.visible('#profileUserIdLabel')
        .verify.visible('#profileUserId')
        .verify.visible('#profileBiographyLabel')
        .verify.visible('#profileBiography')
        .verify.visible('#profileSponsorLabel')
        .verify.visible('#profileSponsor')
        .verify.visible('#profileSponsorIdLabel')
        .verify.visible('#profileSponsorId')
        .verify.visible('#profileAvatar')
        .verify.visible('#editProfileButton')
        .verify.visible('#deleteProfileButton')

        .verify.containsText('#profileUserIdLabel', "User ID")
        .verify.containsText('#profileFullNameLabel', "Full Name")
        .verify.containsText('#profileBiographyLabel', "Biography")
        .verify.containsText('#profileSponsorLabel', "Sponsor")
        .verify.containsText('#profileSponsorIdLabel', "Sponsor ID")

        .verify.containsText('#profileUsername', "kermitfrog")
        .verify.containsText('#profileFullName', "Kermit T. Frog")
        .verify.containsText('#profileBiography', "")
        .verify.containsText('#profileSponsor', "ACME Pharmaceuticals")
        .verify.attributeEquals('#profileAvatar', "src", "http://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg")

        .verify.containsText('#editProfileButton', "Edit Profile")
        .verify.containsText('#deleteProfileButton', "Delete")

        .click('#deleteProfileButton')

      .waitForElementVisible('#removeUserModal', 1000)
        .verify.visible('#removeUserModal')
        .verify.visible('#removeUserModalTitle')
        .verify.visible('#removeUserModalMessage')
        .verify.visible('#removeUserModalInput')
        .verify.visible('#confirmRemoveUserButton')
        .verify.visible('#cancelRemoveUserButton')

      .click('#cancelRemoveUserButton').pause(300)
      .waitForElementNotVisible('#removeUserModal', 500).pause(500)

      .click('#deleteProfileButton')
      .waitForElementVisible('#removeUserModal', 1000)

      .clearValue('#removeUserModalInput')
      .setValue('#removeUserModalInput', "kermitfrog")
      .click('#confirmRemoveUserButton').pause(300)

      .waitForElementNotVisible('#removeUserModal', 1000).pause(500)

      //========================================================================
      // USERS LIST PAGE

      .waitForElementVisible("#usersListPage", 1000)
      .setValue("#usersSearchInput", "kermitfrog")
      .verify.elementNotPresent('#usersTable .userListItem:first-child')

      .end();
  }
};
