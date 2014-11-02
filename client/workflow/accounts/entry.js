
AccountsEntry = {
  settings: {
    wrapLinks: true,
    homeRoute: '/home',
    dashboardRoute: '/dashboard'
  },
  config: function(appConfig) {
    this.settings = _.extend(this.settings, appConfig);
    // if (appConfig.signUpTemplate) {
    //   Router.routes = _.reject(Router.routes, function(e, i) {
    //     return e.name === 'entrySignUpPage';
    //   });
    //   return Router.map(function() {
    //     return this.route('signUp', {
    //       path: 'sign-up',
    //       template: appConfig.signUpTemplate
    //     });
    //   });
    // }
  }
};

this.AccountsEntry = AccountsEntry;
