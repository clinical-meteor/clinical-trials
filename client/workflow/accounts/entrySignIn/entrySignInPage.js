
Template.entrySignInPage.helpers({
  emailInputType: function() {
    if (Accounts.ui._options.passwordSignupFields === 'EMAIL_ONLY') {
      return 'email';
    } else {
      return 'string';
    }
  },
  emailPlaceholder: function() {
    var fields;
    fields = Accounts.ui._options.passwordSignupFields;
    if (_.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL'], fields)) {
      return 'Username or email';
    }
    return 'Email';
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  },
  getTotalInteractions: function(){
//  console.log(InteractionsCount.findOne().count);
//  if(InteractionsCount.findOne()){
//    return InteractionsCount.findOne().count;
//  }else{
//    return 0;
//  }
    return 0;
  }
});

Template.entrySignInPage.events({
  'click #entrySignInButton': function() {
    Session.set('email', $('#emailInput').val());
    Session.set('password', $('#passwordInput').val());

    return Meteor.loginWithPassword(Session.get('email'), Session.get('password'), function(error) {
      if (error) {
        return Session.set('entryError', error.reason);
      }else{
        return Router.go(AccountsEntry.settings.dashboardRoute);
      }
    });
  },
  'keydown #entrySignInPage': function(evt,tmpl){
    if(evt.keyCode == 13) {
      $('#entrySignInButton').click();
      evt.preventDefault();
    }
  }
});
