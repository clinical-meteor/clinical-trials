// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Static Pages" : function (client) {
    client
      .url("http://localhost:3000")

      .waitForElementVisible("body", 1000)
      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')

      .click("#signInLink").pause(200)
      .pause(1000)

      .waitForElementVisible("#entrySignInPage", 1000)
      .verify.elementPresent("#emailInput")
      .verify.elementPresent("#passwordInput")
      .verify.elementPresent("#entrySignInButton")

      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")

      .click("#entrySignInButton")
      .pause(1000)

      .waitForElementVisible("#homePage", 1000)


      // studies
      .click("#studiesTile").pause(500)
      .verify.elementPresent("#studiesListPage")
      .click('#navbarBrandLink').pause(500)

      // forms
      .click("#savedFormsTile").pause(500)
      .verify.elementPresent("#formsListPage")
      .click('#navbarBrandLink').pause(500)

      // data
      .click("#collectedDataTile").pause(500)
      .verify.elementPresent("#dataListPage")
      .click('#navbarBrandLink').pause(500)

      // design
      .click("#formBuilderTile").pause(500)
      .verify.elementPresent("#builderPage")
      .click('#navbarBrandLink').pause(500)

      // clients
      .click("#sponsorsTile").pause(500)
      .verify.elementPresent("#sponsorsListPage")
      .click('#navbarBrandLink').pause(500)

      // users
      .click("#usersTile").pause(500)
      .verify.elementPresent("#usersListPage")
      .click('#navbarBrandLink').pause(500)

      // click glossary
      .click("#northeastDropDownLink")
      .pause(500)
      .verify.elementPresent("#northeastDropDownMenu")
      .click("#signOutLink")
      .pause(2000)
      .waitForElementVisible("#landingPage", 1000)
      .end();
  }
};
