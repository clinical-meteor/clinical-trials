// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Home Page" : function (client) {
    client
      .url("http://localhost:3000")

      .waitForElementVisible("body", 1000)

      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#navbarHeader')
      .verify.elementPresent('#navbarHeaderNav')
      .verify.elementPresent('#navbarBrandLink')
      .verify.elementPresent('#signInLink')
      .verify.elementPresent('#signUpLnk')
      .verify.elementPresent('#hero')
      .verify.elementPresent('#features')
      .verify.elementPresent('#featuresTitle')
      .verify.elementPresent('#featuresSubTitle')
      .verify.elementPresent('#firstFeature')
      .verify.elementPresent('#secondFeature')
      .verify.elementPresent('#pricing')
      .verify.elementPresent('#pricingTitle')
      .verify.elementPresent('#pricingSubtitle')
      .verify.elementPresent('#firstPriceCard')
      .verify.elementPresent('#secondPriceCard')
      .verify.elementPresent('#thirdPriceCard')

      .verify.elementPresent('#teamBiographies')

      .click("#signInLink")

      .waitForElementVisible("#entrySignInPage", 1000)
      .waitForElementVisible("#emailInput", 1000)
      .waitForElementVisible("#passwordInput", 1000)
      .waitForElementVisible("#entrySignInButton", 1000)

      .setValue("#emailInput", "janedoe")
      .setValue("#passwordInput", "janedoe")

      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible("#entryErrorMessage", 1000)
      .verify.containsText('#entryErrorMessage', "Incorrect password")
      .verify.cssClassPresent('#entryErrorMessage', 'alert')
      .verify.cssClassPresent('#entryErrorMessage', 'alert-danger')

      .clearValue("#emailInput")
      .clearValue("#passwordInput")

      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")


      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible("#homePage", 1000)

      // navbar tests
      .verify.elementPresent('#navbarHeader')
      .verify.elementPresent('#navbarHeaderNav')
      .verify.elementPresent('#navbarBrandLink')
      .verify.elementPresent('#westNavbarHeader')
      .verify.elementPresent('#navbarMenuToggler')
      .verify.elementPresent('#navbarBrandLink')
      .verify.elementPresent('#eastNavHeaderMenu')
      .verify.elementPresent('#northeastDropDown')
      .verify.elementPresent('#northeastDropDownLink')
      .verify.elementPresent('#northeastDropDownMenu')
      .verify.elementPresent('#userProfileLink')
      .verify.elementPresent('#termsOfServiceLink')
      .verify.elementPresent('#privacyPolicyLink')
      .verify.elementPresent('#aboutLink')
      .verify.elementPresent('#glossaryLink')
      .verify.elementPresent('#signOutLink')

      .waitForElementVisible("#homePage", 1000)

      // saveFormsTile
      .verify.elementPresent('#savedFormsTile')
      .verify.elementPresent('#savedFormsTileImage')

      // collectedDataTile
      .verify.elementPresent('#collectedDataTile')
      .verify.elementPresent('#collectedDataTileImage')

      // formBuilderTile
      .verify.elementPresent('#formBuilderTile')
      .verify.elementPresent('#formBuilderTileImage')


      .verify.elementPresent('#zoomInstructions')

      // footer
      .verify.elementPresent('#navbarFooter')
      .verify.elementPresent('#helpLink')


      .end();
  }
};
