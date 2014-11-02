// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Form Builder" : function (client) {

    var formName = "Test Form - " + Math.random().toString(10).slice(2,6);

    client
      .url("http://localhost:3000")

      // landing page displays when we're not logged in
      .waitForElementVisible("body", 1000)
      .verify.elementPresent('#landingPage')
      .verify.elementPresent('#signInLink')

      // verify the sign-in page renders correctly
      .click("#signInLink").pause(200)
      .waitForElementVisible("#entrySignInPage", 1000)
      .verify.elementPresent("#emailInput")
      .verify.elementPresent("#passwordInput")
      .verify.elementPresent("#entrySignInButton")

      // log in as the system administrator
      .setValue("#emailInput", "sysadmin")
      .setValue("#passwordInput", "sysadmin321$")
      .click("#entrySignInButton").pause(1000)

      .waitForElementVisible("#homePage", 1000)

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

      .click('#formBuilderTile').pause(500)


      //========================================================================
      // FORM BUILDER

        // navigate to the form builder
        .verify.elementPresent("#builderPage")
        .verify.elementPresent('#sortableListPanel')
        .verify.elementPresent('#list')

        // confirm footer elements; sidebar elements
        .verify.elementPresent('#clearFormLink')
        .verify.elementPresent('#saveFormLink')

        .verify.elementPresent('#westPanel')
        .verify.elementPresent('#addNewFieldTab')
        .verify.elementPresent('#editFieldTab')

        .verify.elementPresent('#addNewFieldPanel')
        .verify.elementPresent('#textInputBlock')
        .verify.elementPresent('#textareaInputBlock')
        .verify.elementPresent('#numericInputBlock')
        .verify.elementPresent('#spacerBlock')
        .verify.elementPresent('#sectionTitleBlock')
        .verify.elementPresent('#yesNoInputBlock')

        .verify.visible('#addNewFieldTab')


        // clear all elements in the form
        .click('#clearFormLink')
        .verify.elementNotPresent('#list .item:first-child')

        // the edit tab shouldn't work until a item is selected
        .click('#editFieldTab').pause(200)
        .verify.elementNotPresent('#editFieldPanel')

        //----------------------------------------------------------------------
        // TEXTBOX

        // clicking textbox control in the sidebar should create a textbox
        .click('#textInputBlock').pause(200)
        .verify.elementPresent('#list .item:first-child')
        .verify.cssClassPresent('#list .item:first-child', 'selected')

        // edit the textblock item, make sure it updates in the list
        .verify.visible('#editFieldTab')
        .verify.elementPresent('#questionInput')
        .verify.elementPresent('#defaultValueInput')
        .verify.elementPresent('#orderInput')
        .clearValue('#questionInput')
        .clearValue('#defaultValueInput')
        .setValue('#questionInput', "Full Name")
        .verify.attributeEquals('#orderInput', 'value', '1')

        .click('#saveFormBlockParamsButton').pause(100)
        .verify.elementPresent('#list .item:first-child')
        .verify.cssClassPresent('#list .item:first-child', 'selected')
        .verify.elementPresent('#list .item:first-child .blockLabel')
        .verify.containsText('#list .item:first-child .blockLabel', 'Full Name')

        .click('#addNewFieldTab').pause(200)
        .verify.elementPresent('#addNewFieldPanel')


        //----------------------------------------------------------------------
        // YESNO BLOCK

        // clicking yesno control in the sidebar should create a yesno block
        .click('#yesNoInputBlock').pause(200)
        .verify.elementPresent('#list .item:nth-child(2)')
        .verify.cssClassPresent('#list .item:nth-child(2)', 'selected')
        .clearValue('#questionInput')
        .clearValue('#defaultValueInput')
        .setValue('#questionInput', "Are you alergic to asprin?")
        .verify.attributeEquals('#orderInput', 'value', '2')

        .click('#saveFormBlockParamsButton').pause(100)
        .verify.elementPresent('#list .item:nth-child(2)')
        .verify.cssClassPresent('#list .item:nth-child(2)', 'selected')
        .verify.elementPresent('#list .item:nth-child(2) .yesNoText')
        .verify.containsText('#list .item:nth-child(2) .yesNoText', 'Are you alergic to asprin?')

        .clearValue('#formTitleInput')
        .setValue('#formTitleInput', formName)


      .end();
  }
};
