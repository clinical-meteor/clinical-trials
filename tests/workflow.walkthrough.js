// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Walkthrough" : function (client) {

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


      //========================================================================
      // FORMS TABLE


        .click('#saveFormLink').pause(200)
        .verify.elementPresent("#formsListPage")
        .verify.elementPresent('#formsTable')

        // .verify.elementPresent('#publishFormLink')
        // .verify.elementPresent('#editFormLink')
        // .verify.elementPresent('#deleteFormLink')

        // users table
        .waitForElementVisible('#formsTable', 1000)
          .verify.elementPresent('#formsTableStarredColumn')
          .verify.containsText("#formsTableStarredColumn", "Starred")
          // .verify.elementPresent('#formsTableFormIdColumn')
          // .verify.containsText("#formsTableFormIdColumn", "Form ID")
          .verify.elementPresent('#formsTableFormNameColumn')
          .verify.containsText("#formsTableFormNameColumn", "Form Name")
          .verify.elementPresent('#formsTableOwnerColumn')
          .verify.containsText("#formsTableOwnerColumn", "Owner")
          .verify.elementPresent('#formsTableNumBlocksColumn')
          .verify.containsText("#formsTableNumBlocksColumn", "# Blocks")
          .verify.elementPresent('#formsTableCreatedAtColumn')
          .verify.containsText("#formsTableCreatedAtColumn", "Created")
          .verify.elementPresent('#formsTableActiveColumn')
          .verify.containsText("#formsTableActiveColumn", "Active")


        // test searching for 'sysadmin' username
        .setValue("#formSearchInput", formName)

        .verify.elementPresent('#formsTable .individualFormRow:first-child')
          .verify.elementPresent('#formsTable .individualFormRow:first-child td:first-child')

          .verify.elementPresent('#formsTable .individualFormRow:first-child td:nth-child(1)')
          .verify.elementPresent('#formsTable .individualFormRow:first-child td:nth-child(2)')
          .verify.elementPresent('#formsTable .individualFormRow:first-child td:nth-child(3)')
          .verify.elementPresent('#formsTable .individualFormRow:first-child td:nth-child(4)')
          .verify.elementPresent('#formsTable .individualFormRow:first-child td:nth-child(5)')
          .verify.elementPresent('#formsTable .individualFormRow:first-child td:nth-child(6)')

          .verify.elementPresent('#formsTable .individualFormRow:first-child td:first-child')
          //.verify.containsText('#formsTable .individualFormRow:first-child td:nth-child(1)', 'sysadmin')
          .verify.containsText('#formsTable .individualFormRow:first-child td:nth-child(2)', formName)
          .verify.containsText('#formsTable .individualFormRow:first-child td:nth-child(3)', 'sysadmin')
          .verify.containsText('#formsTable .individualFormRow:first-child td:nth-child(4)', '2')
          .verify.containsText('#formsTable .individualFormRow:first-child td:nth-child(5)', '2014')
          .verify.containsText('#formsTable .individualFormRow:first-child td:nth-child(6)', 'true')


        .click('#formsTable .individualFormRow:first-child').pause(200)
          .waitForElementVisible('#formPreviewPage', 1000)

          .verify.elementPresent('#formBody')
          .verify.elementPresent('#formBody .item:first-child')
          .verify.elementPresent('#formBody .item:first-child .blockLabel')
          .verify.containsText('#formBody .item:first-child .blockLabel', 'Full Name')

          .verify.elementPresent('#formBody .item:nth-child(2)')
          .verify.elementPresent('#formBody .item:nth-child(2) .yesNoText')
          .verify.containsText('#formBody .item:nth-child(2) .yesNoText', 'Are you alergic to asprin?')

        .click('#publishFormLink')



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
