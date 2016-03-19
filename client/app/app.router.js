getYieldTemplates = function() {
  if (Meteor.userId()) {
    return {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      },
      'sidebar': {
        to: 'westPanel'
      }
      //'sidebarTemplate': {to: 'aside'}
    };
  } else {
    return {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      },
      'sidebar': {
        to: 'westPanel'
      }
      //'sidebarTemplate': {to: 'aside'}
    };
    //return {};
  }
};


//--------------------------------------------------------------
// Accounts Entry Routes

// Router.map(function() {
//   this.route("entrySignUpRoute", {
//     path: "/sign-up",
//     template: "entrySignUpPage",
//     yieldTemplates: getYieldTemplates(),
//     onBeforeAction: function() {
//       Session.set('entryError', void 0);
//       setPageTitle("Sign Up");
//     }
//   });
//   this.route("entrySignInRoute", {
//     path: "/sign-in",
//     template: "entrySignInPage",
//     yieldTemplates: getYieldTemplates(),
//     onBeforeAction: function() {
//       Session.set('entryError', void 0);
//       setPageTitle("Sign In");
//     }
//   });
//
//   this.route("entryForgotPasswordRoute", {
//     path: "/forgot-password",
//     template: "entryForgotPassword",
//     yieldTemplates: getYieldTemplates(),
//     onBeforeAction: function() {
//       setPageTitle("Forgot Password");
//       return Session.set('entryError', void 0);
//     }
//   });
//   this.route('entrySignOutRoute', {
//     path: '/sign-out',
//     template: "entrySignOut",
//     yieldTemplates: getYieldTemplates(),
//     onBeforeAction: function() {
//       Session.set('entryError', void 0);
//       Meteor.logout();
//       Router.go('/');
//     }
//   });
//   this.route('entryResetPasswordRoute', {
//     path: 'reset-password/:resetToken',
//     template: "entryResetPassword",
//     yieldTemplates: getYieldTemplates(),
//     onBeforeAction: function() {
//       Session.set('entryError', void 0);
//       setPageTitle("Reset Password");
//       return Session.set('resetToken', this.params.resetToken);
//     }
//   });
// });


//--------------------------------------------------------------
// Error Routes

Router.map(function() {
  this.route("browserNotSupportedRoute", {
    path: "/notsupported",
    template: "browserNotSupportedPage",
    yieldTemplates: getYieldTemplates(),
    onAfterAction: function() {
      Session.set('entryError', void 0);
      setPageTitle("Browser Not Supported");
    }
  });
  // this.route("pageNotFoundRoute", {
  //   path: "/notfound",
  //   template: "notFoundPage",
  //   yieldTemplates: getYieldTemplates(),
  //   onBeforeAction: function() {
  //     Session.set('entryError', void 0);
  //     setPageTitle("Not Found Page");
  //   }
  // });
  // this.route("loadingPageRoute", {
  //   path: "/loading",
  //   template: "loadingPage",
  //   yieldTemplates: getYieldTemplates(),
  //   onBeforeAction: function() {
  //     Session.set('entryError', void 0);
  //     setPageTitle("Loading");
  //   }
  // });

});




//--------------------------------------------------------------
// Routes

renderHomePage = function(scope){
  if (Meteor.userId()) {
    scope.render("homePage");
    scope.render("navbarHeader", {to: 'header'});
    scope.render("sidebar", {to: 'westPanel'});
    //scope.render("sidebarTemplate",{to: 'aside'});
  }else{
    scope.render("landingPage");
    scope.render("navbarHeader", {to: 'header'});
    scope.render("sidebar", {to: 'westPanel'});
    //scope.render("sidebarTemplate",{to: 'aside'});
  }
};


Router.map(function() {

  this.route('homePage', {
    path: '/',
    template:'homePage',
    yieldTemplates: getYieldTemplates(),
    onAfterAction: function(){
      renderHomePage(this);
      setPageTitle("Landing Page");

      // the home page route is a hacky way to simulate an onLogin Hook
      Session.set('defaultUserProfileCard', 'basicInfoCard');
      Session.set('updatePasswordIsSuccessful', false);
    }
  });

  this.route('dashboardRoute', {
    path: '/dashboard',
    template: "homePage",
    yieldTemplates: getYieldTemplates(),
    onAfterAction: function() {
      console.log('routing to: /dashboard');
      setPageTitle("Welcome");
    }
  });
  this.route('eulaRoute', {
    path: '/eula',
    template: 'eulaPage',
    yieldTemplates: getYieldTemplates(),
    onAfterAction: function() {
      setPageTitle("End User License Agreement");
    }
  });
  this.route('privacyRoute', {
    path: '/privacy',
    template: 'privacyPage',
    yieldTemplates: getYieldTemplates(),
    onAfterAction: function() {
      setPageTitle("Privacy Policy");
    }
  });
  this.route('glossaryRoute', {
    path: '/glossary',
    template: 'glossaryPage',
    yieldTemplates: getYieldTemplates(),
    onAfterAction: function() {
      setPageTitle("Glossary");
    }
  });
  this.route('aboutRoute', {
    path: '/about',
    template: 'aboutPage',
    yieldTemplates: getYieldTemplates(),
    onAfterAction: function() {
      setPageTitle("About");
    }
  });



});
