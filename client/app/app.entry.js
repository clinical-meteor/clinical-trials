Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Meteor.startup(function() {
  return AccountsEntry.config({
    privacyUrl: '/privacy-policy',
    termsUrl: '/terms-of-use',
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: 'profile',
    showSignupCode: true
  });
});
