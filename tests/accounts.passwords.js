// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  "Password Workflow" : function (client) {

    var username = "fozzybear";
    var userFullName = "Fozzy Bear";
    var userEmail = "fozzy@clinical-trials.lifesupport.io";
    var originalPassword = "RubberChicken";
    var newPassword = "KnockKnock";
    var newNewPassword = "WockaWockaWocka";
    var userUrl = "http://en.wikipedia.org/wiki/Fozzie_Bear";
    var userAvatar = "http://img2.wikia.nocookie.net/__cb20120410231906/muppet/images/thumb/b/b5/Fozzie2.jpg/300px-Fozzie2.jpg";
    var userRole = "Reviewer";
    var userSponsor = "ACME Pharmaceuticals";
    var currentYear = "2014";
    var userTitle = "Comedian";
    var userPhone = "888-555-1234";
    var userAddress = "123 Joke Street";
    var userCity = "Laughsville";
    var userState = "AL";
    var userZip = "72138";

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
      // A. INTRO/HOME PAGE (SYSADMIN)

      .verify.elementPresent('#homePage', "================================================")
      .verify.elementPresent('#homePage', "== A. INTRO/HOME PAGE (SYSADMIN)")


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
      // B. USERS LIST PAGE (SYSADMIN)

      // test that the page contains search and control elements
      .waitForElementVisible("#usersListPage", 1000)

      .verify.elementPresent('#usersListPage', "================================================")
      .verify.elementPresent('#usersListPage', "== B. USERS LIST PAGE (SYSADMIN)")


      // test searching for 'sysadmin' username
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", userFullName)

      .verify.elementNotPresent('#usersTable .userListItem:first-child')

      .click("#newUserButton")
      .pause(1000)

      //========================================================================
      // C. NEW USER PAGE (SYSADMIN CREATING FOZZY)

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


      // .setValue('#profileUsernameInput', "kermitfrog")
      // .setValue('#profileEmailInput', "kermit@thinaire.net")
      // .setValue('#profileNameInput', "Kermit T. Frog")
      // .setValue('#profileTitleInput', "Frog")
      // .setValue('#profilePhoneInput', "888-555-1234")
      // .clearValue('#profileWebsiteInput')
      // .setValue('#profileWebsiteInput', "http://en.wikipedia.org/wiki/Kermit_the_Frog")
      // .clearValue('#profileAvatarInput')
      // .setValue('#profileAvatarInput', "http://upload.wikimedia.org/wikipedia/en/6/62/Kermit_the_Frog.jpg")
      // .setValue('#profileAddressInput', "123 Pond Lane")
      // .setValue('#profileCityInput', "Swampville")
      // .setValue('#profileStateInput', "Louisiana")
      // .setValue('#profileZipInput', "71432")

      .setValue('#profileUsernameInput', username)
      .setValue('#profileEmailInput', userEmail)
      .setValue('#profileNameInput', userFullName)
      .setValue('#profileTitleInput', userTitle)
      .setValue('#profilePhoneInput', userPhone)
      .clearValue('#profileWebsiteInput')
      .setValue('#profileWebsiteInput', userUrl)
      .clearValue('#profileAvatarInput')
      .setValue('#profileAvatarInput', userAvatar)
      .setValue('#profileAddressInput', userAddress)
      .setValue('#profileCityInput', userCity)
      .setValue('#profileStateInput', userState)
      .setValue('#profileZipInput', userZip)


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

      .click("#saveBasicInfoButton").pause(3000)

      //-----------------------------------------------------------
      // D. SET PASSWORD

      // .verify.elementPresent('#showBasicInfoCard')
      //
      // .verify.elementPresent('#showBasicInfoCard', "================================================")
      // .verify.elementPresent('#showBasicInfoCard', "== D. SET PASSWORD")
      //
      // .verify.elementPresent('#showSecurityCard')
      // .verify.elementPresent('#showPreferencesCard')
      //
      // .click("#showSecurityCard").pause(300)

      .verify.elementPresent('#userSecurityCard')

        .verify.elementPresent('#resetPasswordTitle')
        .verify.elementPresent('#resetPasswordMessage')

        .verify.elementPresent('#newPasswordLabel')
        .verify.elementPresent('#confirmPasswordLabel')
        .verify.elementPresent('#newPasswordInput')
        .verify.elementPresent('#confirmPasswordInput')

        .verify.elementPresent('#updatePasswordButton')

        .setValue('#newPasswordInput', originalPassword)
        .setValue('#confirmPasswordInput', originalPassword)

        .click('#updatePasswordButton').pause(1000)

      //.verify.elementPresent('#resetPasswordSuccessfulAlert')
      .verify.elementPresent('#resetPasswordSuccessfulMessage')
      .verify.containsText('#resetPasswordSuccessfulMessage', "Success!")

      .click('#navbarBrandLink')
      .waitForElementVisible('#usersTile', 1000)
      .click('#usersTile')


      //========================================================================
      // E. USERS LIST PAGE (SYSADMIN)

      // test that the page contains search and control elements
      .verify.elementPresent("#usersListPage")
      .verify.elementPresent('#usersListPage', "================================================")
      .verify.elementPresent('#usersListPage', "== E. USERS LIST PAGE (SYSADMIN)")

      .waitForElementVisible("#usersTable", 1000)

      // test searching for 'kermitfrog' username
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", username)
      .pause(500)
      //.verify.attributeEquals()

      // .verify.elementPresent('#usersTable .userListItem:first-child')
      //   .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
      //   .verify.elementPresent('#usersTable .userListItem:first-child td:first-child img')
      //   .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'img-circle')
      //   .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'avatar')
      //   .verify.cssClassPresent('#usersTable .userListItem:first-child td:first-child img', 'hidden-phone')
      //   .verify.attributeEquals('#usersTable .userListItem:first-child td:first-child img', 'src', userAvatar)
      //
      //   .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', username)
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', '2014')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', userFullName)
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'User')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', 'ACME, Inc.')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(7)', userEmail)


        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(1)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(2)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(3)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(4)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(5)')
        .verify.elementPresent('#usersTable .userListItem:first-child td:nth-child(6)')

        .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', username)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', currentYear)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', userFullName)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', userRole)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', userSponsor)
        .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', userEmail)


      .click('#usersTable .userListItem:first-child')


      //========================================================================
      // F. SIGN-OUT (SYSADMIN)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#signOutLink")
      .pause(2000)

      //========================================================================
      // G. SIGN IN PAGE (FOZZY)

      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')
      .click("#signInLink")
      .pause(1000)

      .waitForElementVisible("#entrySignInPage", 1000)
        .verify.elementPresent('#entrySignInPage', "================================================")
        .verify.elementPresent('#entrySignInPage', "== G. SIGN IN PAGE (FOZZY)")

        .verify.elementPresent("#emailInput")
        .verify.elementPresent("#passwordInput")
        .verify.elementPresent("#entrySignInButton")

      .clearValue("#emailInput")
      .clearValue("#passwordInput")
      .setValue("#emailInput", username)
      .setValue("#passwordInput", originalPassword)
      .click("#entrySignInButton")
      .pause(1000)

      //========================================================================
      // H. INTRO/HOME PAGE (FOZZY)

      .waitForElementVisible("#homePage", 10000)
      .verify.elementPresent('#homePage', "================================================")
      .verify.elementPresent('#homePage', "== H. INTRO/HOME PAGE (FOZZY)")


      // open the menu
      .waitForElementVisible("#northeastDropDownLink", 1000)
      .click("#northeastDropDownLink")
      .waitForElementVisible("#northeastDropDownMenu", 2000)

      .verify.elementPresent('#userProfileLink')
      .verify.containsText("#userProfileLink", "Profile")

      // click user profile link
      .click("#userProfileLink")
      .pause(200)
      .waitForElementVisible("#myProfilePage", 1000)
      .verify.elementPresent('#myProfilePage', "================================================")
      .verify.elementPresent('#myProfilePage', "== I. USERS PROFILE PAGE (FOZZY)")

      .verify.elementPresent('#editProfileButton')

      // click terms of service
      .click("#editProfileButton")
      .pause(200)
      .waitForElementVisible("#userEditPage", 1000)


      // //========================================================================
      // // I. USERS LIST PAGE (FOZZY)
      //
      // // test that the page contains search and control elements
      // .waitForElementVisible("#usersListPage", 1000)
      //
      // // test searching for 'sysadmin' username
      // .setValue("#usersSearchInput", userFullName)
      //
      // .verify.elementNotPresent('#usersTable .userListItem:first-child')
      //   .verify.elementPresent('#usersTable .userListItem:first-child td:first-child')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(1)', userFullName)
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(2)', '2014')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(3)', 'System Administrator')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(4)', 'SysAdmin')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(5)', 'Thinaire')
      //   .verify.containsText('#usersTable .userListItem:first-child td:nth-child(6)', userEmail)
      //
      // .click("#usersTable .userListItem:first-child")
      // .pause(1000)



      //========================================================================
      // J. EDIT USER PAGE (FOZZY)

      .waitForElementVisible("#userEditPage", 1000)
      .verify.elementPresent('#userEditPage', "================================================")
      .verify.elementPresent('#userEditPage', "== J. EDIT USER PAGE (FOZZY)")

      .pause(100)
      .verify.visible('#userBasicInfoCard')
      .verify.visible('#userEditPageTitle')
      .verify.visible('#userEditForm')

      .waitForElementVisible("#profileUsernameInput", 1000)
      .waitForElementVisible("#profileEmailInput", 1000)
      .waitForElementVisible("#profileNameInput", 1000)
      .waitForElementVisible("#profileTitleInput", 1000)
      .waitForElementVisible("#findSponsorButton", 1000)
      .waitForElementVisible("#findRoleButton", 1000)
      .waitForElementVisible("#userAvatarImage", 1000)
      .waitForElementVisible("#profilePhoneInput", 1000)
      .waitForElementVisible("#profileWebsiteInput", 1000)
      .waitForElementVisible("#profileAddressInput", 1000)
      .waitForElementVisible("#profileCityInput", 1000)
      .waitForElementVisible("#profileStateInput", 1000)
      .waitForElementVisible("#profileZipInput", 1000)

      .verify.attributeEquals('#profileUsernameInput', "value", username)
      .verify.attributeEquals('#profileEmailInput', "value", userEmail)
      .verify.attributeEquals('#profileNameInput', "value", userFullName)
      .verify.attributeEquals('#profileTitleInput', "value", userTitle)
      .verify.attributeEquals('#findSponsorButton', "value", userSponsor)
      .verify.attributeEquals('#findRoleButton', "value", userRole)
      .verify.attributeEquals('#userAvatarImage', 'src', userAvatar)
      .verify.attributeEquals('#profilePhoneInput', "value", userPhone)
      .verify.attributeEquals('#profileWebsiteInput', "value", userUrl)
      .verify.attributeEquals('#profileAddressInput', "value", userAddress)
      .verify.attributeEquals('#profileCityInput', "value", userCity)
      .verify.attributeEquals('#profileStateInput', "value", userState)
      .verify.attributeEquals('#profileZipInput', "value", userZip)

      //-----------------------------------------------------------
      // K. SET PASSWORD (FOZZY)

      .verify.elementPresent('#showSecurityCard')
      .verify.elementPresent('#showSecurityCard', "================================================")
      .verify.elementPresent('#showSecurityCard', "== K. SET PASSWORD (FOZZY)")

      .click("#showSecurityCard").pause(300)
      .verify.elementPresent('#userSecurityCard')

        .verify.elementPresent('#resetPasswordTitle')
        .verify.elementPresent('#resetPasswordMessage')

        .verify.elementPresent('#newPasswordLabel')
        .verify.elementPresent('#confirmPasswordLabel')
        .verify.elementPresent('#newPasswordInput')
        .verify.elementPresent('#confirmPasswordInput')

        .verify.elementPresent('#updatePasswordButton')

        .clearValue('#newPasswordInput')
        .clearValue('#confirmPasswordInput')
        .setValue('#newPasswordInput', newPassword)
        .setValue('#confirmPasswordInput', newPassword)

      .click("#updatePasswordButton").pause(300)

      .verify.elementPresent('#resetPasswordSuccessfulMessage')
      .verify.containsText('#resetPasswordSuccessfulMessage', "Success!")


      //========================================================================
      // L. SIGN-OUT (FOZZY)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#signOutLink")
      .pause(2000)
      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')

      .click("#signInLink").pause(200)
      .pause(1000)
      .waitForElementVisible("#entrySignInPage", 1000)


      //========================================================================
      // M. SIGN IN PAGE (FOZZY)


      .waitForElementVisible("#entrySignInPage", 1000)

        .verify.elementPresent('#entrySignInPage', "================================================")
        .verify.elementPresent('#entrySignInPage', "== M. SIGN IN PAGE (FOZZY)")

        .verify.elementPresent("#emailInput")
        .verify.elementPresent("#passwordInput")
        .verify.elementPresent("#entrySignInButton")

      .clearValue('#emailInput')
      .clearValue('#passwordInput')
      .setValue("#emailInput", username)
      .setValue("#passwordInput", originalPassword)
      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible('#entryError', 500)
      .verify.elementPresent('#entryError')
      .verify.containsText('#entryError', "Incorrect password")

      .clearValue('#emailInput')
      .clearValue('#passwordInput')
      .setValue("#emailInput", username)
      .setValue("#passwordInput", newPassword)
      .click("#entrySignInButton")
      .pause(1000)


      //========================================================================
      // N. SIGN-OUT (FOZZY)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#signOutLink")
      .pause(2000)
      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')
      .click('#signInLink')
      .pause(2000)
      .waitForElementVisible("#entrySignInPage", 1000)


      //========================================================================
      // O. SIGN IN PAGE (SYSADMIN)

      .waitForElementVisible("#entrySignInPage", 1000)
        .verify.elementPresent('#entrySignInPage', "================================================")
        .verify.elementPresent('#entrySignInPage', "== O. SIGN IN PAGE (SYSADMIN)")

        .verify.elementPresent("#emailInput")
        .verify.elementPresent("#passwordInput")
        .verify.elementPresent("#entrySignInButton")

      .clearValue('#emailInput')
      .clearValue('#passwordInput')
      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")
      .click("#entrySignInButton")
      .pause(1000)

      //========================================================================
      // P. INTRO/HOME PAGE (SYSADMIN)

      .verify.elementPresent('#homePage', "================================================")
      .verify.elementPresent('#homePage', "== P. INTRO/HOME PAGE (SYSADMIN)")
      .verify.elementPresent("#usersTile")

      .click('#usersTile')


      //========================================================================
      // Q. USERS LIST PAGE (SYSADMIN)

      // test that the page contains search and control elements
      .waitForElementVisible("#usersListPage", 1000)
      .verify.elementPresent('#usersListPage', "================================================")
      .verify.elementPresent('#usersListPage', "== Q. USERS LIST PAGE (SYSADMIN)")

      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", username)
      .verify.elementPresent('#usersTable .userListItem:first-child')
      .click("#usersTable .userListItem:first-child")
      .pause(1000)


      //========================================================================
      // R. USER PROFILE PAGE (SYSADMIN VIEWING FOZZY)

      .verify.elementPresent("#userProfilePage")
      .verify.elementPresent('#userProfilePage', "================================================")
      .verify.elementPresent('#userProfilePage', "== R. USERS LIST PAGE (SYSADMIN)")

      .verify.elementPresent("#editProfileButton")
      .click('#editProfileButton')

      //========================================================================
      // S. EDIT USER PAGE (SYSADMIN)

      .verify.elementPresent("#userEditPage")
      .verify.elementPresent('#userEditPage', "================================================")
      .verify.elementPresent('#userEditPage', "== S. EDIT USER PAGE (SYSADMIN)")

      .pause(100)
      .verify.visible('#userBasicInfoCard')
      .verify.visible('#userEditPageTitle')
      .verify.visible('#userEditForm')

      .verify.attributeEquals('#profileUsernameInput', "value", username)
      .verify.attributeEquals('#profileEmailInput', "value", userEmail)
      .verify.attributeEquals('#profileNameInput', "value", userFullName)
      .verify.attributeEquals('#profileTitleInput', "value", userTitle)
      .verify.attributeEquals('#findSponsorButton', "value", userSponsor)
      .verify.attributeEquals('#findRoleButton', "value", userRole)
      .verify.attributeEquals('#userAvatarImage', 'src', userAvatar)
      .verify.attributeEquals('#profilePhoneInput', "value", userPhone)
      .verify.attributeEquals('#profileWebsiteInput', "value", userUrl)
      .verify.attributeEquals('#profileAddressInput', "value", userAddress)
      .verify.attributeEquals('#profileCityInput', "value", userCity)
      .verify.attributeEquals('#profileStateInput', "value", userState)
      .verify.attributeEquals('#profileZipInput', "value", userZip)


      //-----------------------------------------------------------
      // T. SET PASSWORD (SYSADMIN)

      .verify.elementPresent('#showSecurityCard')
      .verify.elementPresent('#showSecurityCard', "================================================")
      .verify.elementPresent('#showSecurityCard', "== T. SET PASSWORD (SYSADMIN)")


      .click("#showSecurityCard").pause(300)
      .verify.elementPresent('#userSecurityCard')

        .verify.elementPresent('#resetPasswordTitle')
        .verify.elementPresent('#resetPasswordMessage')

        .verify.elementPresent('#newPasswordLabel')
        .verify.elementPresent('#confirmPasswordLabel')
        .verify.elementPresent('#newPasswordInput')
        .verify.elementPresent('#confirmPasswordInput')

        .verify.elementPresent('#updatePasswordButton')

        .clearValue('#newPasswordInput')
        .clearValue('#confirmPasswordInput')
        .setValue('#newPasswordInput', newNewPassword)
        .setValue('#confirmPasswordInput', newNewPassword)

      .click("#updatePasswordButton").pause(500)

      .verify.elementPresent('#resetPasswordSuccessfulMessage')
      .verify.containsText('#resetPasswordSuccessfulMessage', "Success!")


      //========================================================================
      // U. SIGN-OUT (SYSADMIN)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#signOutLink")

      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')

      .click("#signInLink").pause(200)
      .pause(1000)
      .waitForElementVisible("#entrySignInPage", 1000)


      //========================================================================
      // V. SIGN IN PAGE (FOZZY)

      .waitForElementVisible("#entrySignInPage", 1000)
        .verify.elementPresent('#entrySignInPage', "================================================")
        .verify.elementPresent('#entrySignInPage', "== V. SIGN IN PAGE (FOZZY)")

        .verify.elementPresent("#emailInput")
        .verify.elementPresent("#passwordInput")
        .verify.elementPresent("#entrySignInButton")
      .setValue("#emailInput", username)
      .setValue("#passwordInput", newPassword)
      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible('#entryError', 500)
      .verify.elementPresent('#entryError')
      .verify.containsText('#entryError', "Incorrect password")

      .clearValue('#emailInput')
      .clearValue('#passwordInput')

      .setValue("#emailInput", username)
      .setValue("#passwordInput", newNewPassword)
      .click("#entrySignInButton")
      .pause(1000)


      //========================================================================
      // W. SIGN-OUT (FOZZY)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#signOutLink")
      .pause(1000)

      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')
      .click("#signInLink").pause(1000)

      .waitForElementVisible("#entrySignInPage", 1000)
      .verify.elementPresent('#entrySignInPage', "================================================")
      .verify.elementPresent('#entrySignInPage', "== SIGNED-OUT (FOZZY)")
        .verify.elementPresent("#emailInput")
        .verify.elementPresent("#passwordInput")
        .verify.elementPresent("#entrySignInButton")
      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")
      .click("#entrySignInButton")
      .pause(1000)


      //========================================================================
      // Z. DELETE FOZZY

      // .verify.elementPresent('#homePage', "================================================")
      // .verify.elementPresent('#homePage', "== Z. INTRO/HOME PAGE (SYSADMIN)")
      // .verify.elementPresent("#usersTile")
      // .click('#usersTile')
      //
      //
      // .waitForElementVisible("#entrySignInPage", 1000)
      //
      //   .verify.elementPresent('#entrySignInPage', "================================================")
      //   .verify.elementPresent('#entrySignInPage', "== Z. DELETE FOZZY")
      //   .verify.elementPresent("#emailInput")
      //   .verify.elementPresent("#passwordInput")
      //   .verify.elementPresent("#entrySignInButton")
      // .setValue("#emailInput", "sysadmin")
      // .setValue("#passwordInput", "sysadmin")
      //
      // .click("#entrySignInButton")
      // .pause(1000)


      .verify.elementPresent('#homePage', "================================================")
      .verify.elementPresent('#homePage', "== Z. INTRO/HOME PAGE (SYSADMIN)")
      .verify.elementPresent("#usersTile")
      .click('#usersTile')

      .waitForElementVisible("#usersListPage", 1000)
      .clearValue('#usersSearchInput')
      .setValue("#usersSearchInput", userFullName).pause(100)
      .verify.elementPresent('#usersTable .userListItem:first-child')

      .click('#usersTable .userListItem:first-child')
      .verify.containsText('#deleteProfileButton', "Delete")

      .click('#deleteProfileButton')
      .waitForElementVisible('#removeUserModal', 1000)
      .verify.visible('#removeUserModal')

      .click('#cancelRemoveUserButton').pause(300)
      .waitForElementNotVisible('#removeUserModal', 1000).pause(500)

      .click('#deleteProfileButton')
      .waitForElementVisible('#removeUserModal', 1000)
      .verify.visible('#removeUserModalInput')
      .clearValue('#removeUserModalInput')
      .setValue('#removeUserModalInput', username)

      .click('#confirmRemoveUserButton').pause(300)
      .waitForElementNotVisible('#removeUserModal', 1000).pause(500)

      .waitForElementVisible("#usersListPage", 1000)
      .setValue("#usersSearchInput", username)
      .verify.elementNotPresent('#usersTable .userListItem:first-child')



      .end();
  }
};
