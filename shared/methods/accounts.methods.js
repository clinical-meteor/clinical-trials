Meteor.methods({
  createNewUser: function(input){
    console.log('creating new user...');
    console.log(input);

    var result = Accounts.createUser({
      username: input.username,
      email: input.address,
      password: input.password
    });

    Meteor.users.update({_id: result}, {$set:{
      profile: input.profile
    }})

    console.log(result);
    return result;
  },

  updateUser: function(input){
    console.log('updating user...')
    console.log(input);

    return result = Meteor.users.update(input._id,{$set:{
      'profile.name': input.profile.name,
      'profile.title': input.profile.title,

      'profile.sponsor': input.profile.sponsor,
      'profile.sponsor_id': input.profile.sponsor_id,

      'profile.roles': input.profile.roles,

      'profile.avatar': input.profile.avatar,
      'profile.phone': input.profile.phone,
      'profile.website': input.profile.website,
      'profile.address': input.profile.address,
      'profile.city': input.profile.city,
      'profile.state': input.profile.state,
      'profile.zip': input.profile.zip
    }});
  },

  removeUser: function(userId){
    console.log('removing user...' + userId);

    var result = Meteor.users.remove({_id: userId });

    console.log(result);
    return result;

  },
  setUserRole:function(userId, role){
    console.log('setUserRole', userId, role);
    var result = Meteor.users.update(userId,{$set:{
      'profile.roles': role
    }});
    return result;
  }
});
