getUserService = function(user) {
  for(var service in user.services) {
    if(service === "facebook") return "facebook";
    if(service === "github") return "github";
    if(service === "twitter") return "twitter";
    if(service === "google") return "google";
  }
}




Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  console.log('*****************************');
  console.log(JSON.stringify(user));
  console.log('-----------------------------');
  console.log(JSON.stringify(options));
  console.log('=============================');

  var service = getUserService(user);

  user.profile = options.profile;
  user.configuration = options.configuration;
  user.role = options.role;

  //avatars for various services
  if(service == "facebook") {
    user.profile.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=square";
  }else if(service == "github") {
    user.profile.avatar = user.services.github.avatar_url;
  }else if(service == "google") {
    user.profile.avatar = user.services.google.picture
  }else{
    if(user.profile && user.profile.avatar == null){
      user.profile.avatar = '/images/icons/Default_User.png';
    }
  }

  // We still want the default hook's 'profile' behavior.
  if (options.profile){
    // sample profile autogeneration function
    var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
    options.profile.traits.dexterity = d6() + d6() + d6();
    options.profile.traits.intelligence = d6() + d6() + d6();
    options.profile.traits.charisma = d6() + d6() + d6();
    options.profile.traits.beauty = d6() + d6() + d6();
    options.profile.traits.strength = d6() + d6() + d6();
    options.profile.traits.wisdom = d6() + d6() + d6();

    user.profile = options.profile;

    if(!user.profile.name){
      user.profile.name = user.emails[0].address.split('@')[0];
    }
    if(!user.profile.role){
      user.profile.role = "User";
    }
    if(!user.profile.name){
      user.profile.name = user.username;
    }
  }

  //extract username and profile name from email
  if(!user.username){
    user.username = user.emails[0].address.split('@')[0];
  }



  console.log(JSON.stringify(user));
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  return user;
});



Meteor.methods({
  setUserSponsor:function(sponsor){
    console.log('setUserSponsor');
    console.log(sponsor);

    return Meteor.users.update(sponsor.user_id,{$set:{
      'profile.company': sponsor.name,
      'profile.sponsor': sponsor.name,
      'profile.sponsor_id': sponsor._id
    }});
  },
  setUserPassword: function(options){
    console.log('setUserPassword');
    console.log(options);
    console.log('Meteor.userId() ' + Meteor.userId());
    if((options._id == Meteor.userId()) || (Meteor.user().profile.roles[0] == "Admin") || (Meteor.user().profile.roles[0] == "SysAdmin")){
      console.log('Access to change password verified.');
      Accounts.setPassword(options._id, options.password);
      return "Success.  Changed password to " + options.password;
    }else{
      console.log('Error changing password. Access denied.');
      return 'Error changing password. Access denied.';
    }
  },

  updateUserRole: function(input){
    console.log('updating user...')
    console.log(input);

    var result = Meteor.users.update(input._id,{$set:{
      'profile.role': input.profile.role
    }});

    console.log(result);
    return result;
  },
  updateUserPreferences: function(input){
    console.log('updateUserPreferences...')
    console.log(input);

    var result = Meteor.users.update(input._id,{$set:{
      'profile.helpTipsVisible': input.profile.helpTipsVisible,
      'profile.tableEntries': input.profile.tableEntries
    }});

    console.log(result);
    return result;
  },

  isAdmin: function (userId) {
    check(userId, String);

    var user = Meteor.users.findOne(userId);
    if((user.profile.role[0] === "Admin") || (user.profile.role[0] === "SysAdmin")){
      return true;
    }else{
      return false;
    }
  },
  isModerator: function (userId) {
    check(userId, String);

    var user = Meteor.users.findOne(userId);
    if(user.profile.role == "Moderator"){
      return true;
    }else{
      return false;
    }
  },
  isEditor: function (userId) {
    check(userId, String);

    var user = Meteor.users.findOne(userId);
    if(user.profile.role === "Editor"){
      return true;
    }else{
      return false;
    }
  }
});
