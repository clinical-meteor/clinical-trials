// // add tests to this file using the Nightwatch.js API
// // http://nightwatchjs.org/api
//
// module.exports = {
//   "Static Pages" : function (client) {
//     client
//       .url("http://localhost:3000")
//
//       .waitForElementVisible("body", 1000)
//       .verify.elementPresent('#landingPage')
//       .verify.elementPresent('#signInLink')
//
//       .click("#signInLink").pause(200)
//       .pause(1000)
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
//       .pause(1000)
//
//       .waitForElementVisible("#homePage", 1000)
//
//       // open the menu
//       .click("#northeastDropDownLink")
//       .pause(100)
//       .waitForElementVisible("#northeastDropDownMenu", 100)
//
//       .verify.elementPresent('#userProfileLink')
//       .verify.containsText("#userProfileLink", "Profile")
//
//       .verify.elementPresent('#termsOfServiceLink')
//       .verify.containsText("#termsOfServiceLink", "End User License")
//
//       .verify.elementPresent('#privacyPolicyLink')
//       .verify.containsText("#privacyPolicyLink", "Privacy Page")
//
//       .verify.elementPresent('#glossaryLink')
//       .verify.containsText("#glossaryLink", "Glossary")
//
//       // .verify.elementPresent('#feedbackSupportLink')
//       // .verify.containsText("#feedbackSupportLink", "Feedback & Support")
//
//       .verify.elementPresent('#signOutLink')
//       .verify.containsText("#signOutLink", "Sign-Out")
//
//       // click terms of service
//       .click("#termsOfServiceLink")
//       .pause(200)
//       .waitForElementVisible("#eulaPage", 1000)
//
//       // click privacy policy
//       .click("#northeastDropDownLink")
//       .pause(500)
//       .verify.elementPresent("#northeastDropDownMenu")
//       .click("#privacyPolicyLink")
//       .pause(200)
//       .waitForElementVisible("#privacyPage", 1000)
//
//       // click glossary
//       .click("#northeastDropDownLink")
//       .pause(500)
//       .verify.elementPresent("#northeastDropDownMenu")
//       .click("#glossaryLink")
//       .pause(200)
//       .waitForElementVisible("#glossaryPage", 1000)
//
//       // click glossary
//       .click("#northeastDropDownLink")
//       .pause(500)
//       .verify.elementPresent("#northeastDropDownMenu")
//       .click("#signOutLink")
//       .pause(2000)
//       .waitForElementVisible("#landingPage", 1000)
//       .end();
//   }
// };
