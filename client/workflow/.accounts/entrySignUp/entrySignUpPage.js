
Template.entrySignUpPage.helpers({
  showEmail: function() {
    var fields = Accounts.ui._options.passwordSignupFields;
    return _.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'EMAIL_ONLY'], fields);
  },
  showUsername: function() {
    var fields = Accounts.ui._options.passwordSignupFields;
    return _.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY'], fields);
  },
  showSignupCode: function() {
    return AccountsEntry.settings.showSignupCode;
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  },
  privacyUrl: function() {
    return AccountsEntry.settings.privacyUrl;
  },
  termsUrl: function() {
    return AccountsEntry.settings.termsUrl;
  },
  both: function() {
    return AccountsEntry.settings.privacyUrl && AccountsEntry.settings.termsUrl;
  },
  neither: function() {
    return !AccountsEntry.settings.privacyUrl && !AccountsEntry.settings.termsUrl;
  },
  emailIsOptional: function() {
    var fields = Accounts.ui._options.passwordSignupFields;
    return _.contains(['USERNAME_AND_OPTIONAL_EMAIL'], fields);
  }
});

Template.entrySignUpPage.events({
  'submit #signUp': function(event, t) {
    var email, emailRequired, fields, password, passwordErrors, signupCode, trimInput, username, usernameRequired;
    event.preventDefault();
    username = t.find('input[name="username"]') ? t.find('input[name="username"]').value : void 0;
    signupCode = t.find('input[name="signupCode"]') ? t.find('input[name="signupCode"]').value : void 0;
    email = t.find('input[type="email"]').value;
    password = t.find('input[type="password"]').value;
    fields = Accounts.ui._options.passwordSignupFields;

    trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    };

    passwordErrors = (function(password) {
      var errMsg, msg;
      errMsg = [];
      msg = false;
      if (password.length < 7) {
        errMsg.push("7 character minimum password.");
      }
      if (password.search(/[a-z]/i) < 0) {
        errMsg.push("Password requires 1 letter.");
      }
      if (password.search(/[0-9]/) < 0) {
        errMsg.push("Password must have at least one digit.");
      }
      if (errMsg.length > 0) {
        msg = "";
        errMsg.forEach(function(e) {
          return msg = msg.concat("" + e + "\r\n");
        });
        Session.set('entryError', msg);
        return true;
      }
      return false;
    })(password);
    if (passwordErrors) {
      return;
    }
    email = trimInput(email);
    emailRequired = _.contains(['USERNAME_AND_EMAIL', 'EMAIL_ONLY'], fields);
    usernameRequired = _.contains(['USERNAME_AND_EMAIL', 'USERNAME_ONLY'], fields);
    if (usernameRequired && email.length === 0) {
      Session.set('entryError', 'Username is required');
      return;
    }
    if (emailRequired && email.length === 0) {
      Session.set('entryError', 'Email is required');
      return;
    }
    if (AccountsEntry.settings.showSignupCode && signupCode.length === 0) {
      Session.set('entryError', 'Signup code is required');
      return;
    }
    return Meteor.call('entryValidateSignupCode', signupCode, function(err, valid) {
      console.log('entryValidateSignupCode.err: ' + err);
      console.log('entryValidateSignupCode.valid: ' + valid);

      if (err) {
        console.log(err);
      }
      if (valid) {
        return Meteor.call('accountsCreateUser', username, email, password, function(err, data) {
          console.log('accountsCreateUser.err: ' + err);
          console.log('accountsCreateUser.valid: ' + valid);

          if (err) {
            Session.set('entryError', err.reason);
            return;
          }
          if (_.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'EMAIL_ONLY'], Accounts.ui._options.passwordSignupFields)) {
            Meteor.loginWithPassword(email, password);
          } else {
            Meteor.loginWithPassword(username, password);
          }
          return Router.go(AccountsEntry.settings.dashboardRoute);
        });
      } else {
        Session.set('entryError', 'Signup code is incorrect');
      }
    });
  }
});
