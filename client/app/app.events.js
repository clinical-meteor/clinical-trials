Meteor.startup(function(){
  Hooks.init();

  Hooks.onLoggedIn = function(){
    Session.set('defaultUserProfileCard', 'basicInfoCard');
    // removeWallpaper();
  };
  Hooks.onLoggedOut = function(userId){
  };
  Hooks.onCreateUser = function(userId){

  };
  Hooks.onDeleteUser = function(userId){

  };
  Hooks.onLoseFocus = function(userId){

  };
  Hooks.onGainFocus = function(userId){

  };
  Hooks.onCloseSession = function(userId){

  };
});
