Session.setDefault('selectRoleFilter', '');
Session.setDefault('selectedRole', null);

Template.selectRoleModal.rolesList = function(){
  return Meteor.roles.find({name: {
    $regex: Session.get('selectRoleFilter'),
    $options: 'i'
  }});
};

Template.selectRoleModal.getSearchTerm = function(){
  return Session.get('selectRoleFilter');
};
Template.selectRoleModal.events({
  'click .list-group-item':function(){
    Session.set('selectedRole', this);
  },
  'keyup #selectRoleModalInput':function(){
    Session.set('selectRoleFilter', $('#selectRoleModalInput').val());
  }
});
