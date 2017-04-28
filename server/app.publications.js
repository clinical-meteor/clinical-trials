// Meteor.publish('items', function(){
//   return Items.find();
// });
Meteor.publish('forms', function(){
  return Forms.find();
});
Meteor.publish('data', function(){
  return Data.find();
});

Meteor.publish('studies', function(){
  return Studies.find();
});
Meteor.publish('sponsors', function(){
  return Sponsors.find();
});
Meteor.publish('subjects', function(){
  return Subjects.find();
});
Meteor.publish('comments', function(){
  return Comments.find();
});
Meteor.publish('usersDirectory', function(){
  return Meteor.users.find();
});
Meteor.publish('userProfile', function(userId){
  return Meteor.users.find({_id: userId});
});


Meteor.publish(null, function (){
  return Meteor.roles.find();
});
