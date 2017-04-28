
Template.entryResetPassword.helpers({
  error: function() {
    return Session.get('entryError');
  },
  logo: function() {
    return Meteor.call('entryLogo');
  }
});

Template.entryResetPassword.events({
  'submit #resetPassword': function(event) {
    var password;
    event.preventDefault();
    password = $('input[type="password"]').val();
    return Accounts.resetPassword(Session.get('resetToken'), password, function(error) {
      if (error) {
        return Session.set('entryError', error.reason || "Unknown error");
      } else {
        Session.set('resetToken', null);
        return Router.go(AccountsEntry.settings.dashboardRoute);
      }
    });
  }
});
