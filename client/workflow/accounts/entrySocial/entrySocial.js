Template.entrySocial.helpers({
  buttonText: function() {
    return Session.get('buttonText');
  },
  google: function() {
    if (this[0] === 'g' && this[1] === 'o') {
      return true;
    }
  }
});

Template.entrySocial.events({
  'click .btn': function(event) {
    var callback, loginWithService, options, serviceName;
    serviceName = $(event.target).attr('id').split('-')[1];
    callback = function(err) {
      if (!err) {
        return Router.go(AccountsEntry.settings.dashboardRoute);
      } else if (err instanceof Accounts.LoginCancelledError) {
        // do nothing
      } else if (err instanceof ServiceConfiguration.ConfigError) {
        return loginButtonsSession.configureService(serviceName);
      } else {
        return loginButtonsSession.errorMessage(err.reason || "Unknown error");
      }
    };
    loginWithService = Meteor["loginWith" + capitalize(serviceName)];
    options = {};
    if (Accounts.ui._options.requestPermissions[serviceName]) {
      options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
    }
    if (Accounts.ui._options.requestOfflineToken[serviceName]) {
      options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
    }
    loginWithService(options, callback);
    return Router.go(AccountsEntry.settings.dashboardRoute);
  }
});

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
