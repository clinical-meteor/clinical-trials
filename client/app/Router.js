//--------------------------------------------------------------
// Routing Layouts

Session.setDefault('fullscreenOverride', true);

Router.configure({
  // we use the  appLayout template to define the layout for the entire app
  layoutTemplate: 'appLayout',

  // the pageNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'pageNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  yieldTemplates: {
    'sidebar': {
      to: 'westPanel'
    },
    'navbarHeader': {
      to: 'header'
    },
    'navbarFooter': {
      to: 'footer'
    },
    'reactiveOverlaysTemplate': {
      to: 'overlays'
    },
    'globalSearchBar': {
      to: 'globalInput'
    },
    'tutorialModal': {
      to: 'modalA'
    },
    'sponsorSearchModal': {
      to: 'modalB'
    },
    'formSearchModal': {
      to: 'modalC'
    },
    'subjectSearchModal': {
      to: 'modalD'
    },
    'selectRoleModal': {
      to: 'modalE'
    },
    'removeUserModal': {
      to: 'modalF'
    },
    'sponsorSearchModal': {
      to: 'modalG'
    }
  }
});


Router.onBeforeAction(function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    this.redirect('/sign-in');
  }
  this.next();
}, {
  except: [
    'homePage',
    'landingRoute',
    'eulaRoute',
    'privacyRoute',
    'aboutRoute',
    'glossaryRoute',
    'browserNotSupportedRoute',
    'entrySignUp',
    'entrySignIn',
    'forgotPassword',
    'entrySignOutRoute',
    'resetPassword',
    'pageNotFound'
  ]
});
Router.onBeforeAction(function() {
  //hideWestPanel();
  this.next();
}, {except: ['builderPage']});

// Router.onBeforeAction(function() {
//   if(!bowser.webkit){
//     this.render('browserNotSupportedPage');
//     this.pause();
//   }
// });
