// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  "My Profile Workflow" : function (client) {

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

      //.click('#usersTile')


  // open the menu
      .waitForElementVisible("#northeastDropDownLink", 1000)
      .click("#northeastDropDownLink")
      //.pause(500)
      .waitForElementVisible("#northeastDropDownMenu", 2000)

      .verify.elementPresent('#userProfileLink')
      .verify.containsText("#userProfileLink", "Profile")

      // click user profile link
      .click("#userProfileLink")
      .pause(200)


    //========================================================================
    // USERS PROFILE PAGE

    .waitForElementVisible("#myProfilePage", 1000)


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

      .verify.containsText('#profileUsername', "sysadmin")
      .verify.containsText('#profileFullName', "System Administrator")
      .verify.containsText('#profileBiography', "")
      .verify.containsText('#profileSponsor', "clinical-trials.meteor.com")
      .verify.attributeEquals('#profileAvatar', "src", "http://localhost:3000/images/icons/Default_User.png")

      .verify.containsText('#editProfileButton', "Edit Profile")
      .verify.containsText('#deleteProfileButton', "Delete")


      .click("#editProfileButton")
      .pause(200)



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
      .verify.attributeEquals('#findSponsorButton', "value", "clinical-trials.meteor.com")
      .verify.attributeEquals('#findRoleButton', "value", "SysAdmin")
      .verify.attributeEquals('#userAvatarImage', 'src', 'http://localhost:3000/images/icons/Default_User.png')
      .verify.containsText('#profilePhoneInput', "")
      .verify.containsText('#profileWebsiteInput', "")
      .verify.containsText('#profileAddressInput', "")
      .verify.containsText('#profileCityInput', "")
      .verify.containsText('#profileStateInput', "")
      .verify.containsText('#profileZipInput', "")


      // .setValue('#profileUsernameInput', "sysadmin")
      // .setValue('#profileEmailInput', "sysadmin@clinical-trials.meteor.com")
      // .setValue('#profileNameInput', "System Administrator")
      // .setValue('#profileTitleInput', "")
      // .setValue('#profilePhoneInput', "")
      // .clearValue('#profileWebsiteInput')
      // .setValue('#profileWebsiteInput', "")
      // .clearValue('#profileAvatarInput')
      // .setValue('#profileAvatarInput', "")
      // .setValue('#profileAddressInput', "")
      // .setValue('#profileCityInput', "")
      // .setValue('#profileStateInput', "")
      // .setValue('#profileZipInput', "")


      .end();
  }
};
