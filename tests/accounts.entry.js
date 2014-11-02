// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Sign In Page" : function (client) {
    client
      .url("http://localhost:3000")

      //========================================================================
      // LANDING PAGE

      .waitForElementVisible("body", 1000)
      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')

      .click("#signInLink").pause(200)
      .pause(1000)

      .click("#signInLink")

      //========================================================================
      // SIGN IN PAGE

      .waitForElementVisible("#entrySignInPage", 1000)
      .waitForElementVisible("#emailInput", 1000)
      .waitForElementVisible("#passwordInput", 1000)
      .waitForElementVisible("#entrySignInButton", 1000)

      .verify.elementPresent('#entrySignInPage')
      //.verify.elementPresent('#thinaireSignInLogo')
      .verify.elementPresent('#emailInput')
      .verify.elementPresent('#passwordInput')
      .verify.elementPresent('#signInLabel')
      .verify.elementPresent('#forgotPasswordLink')
      .verify.elementPresent('#entrySignInButton')

      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")

      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible("#homePage", 1000)
      .end();
  }
};
