Session.setDefault('selectRoleFilter', '');
Session.setDefault('selectedRole', null);



Template.selectRoleModal.events({
  'click .list-group-item':function(){
    Session.set('selectedRole', this);
  },
  'keyup #selectRoleModalInput':function(){
    Session.set('selectRoleFilter', $('#selectRoleModalInput').val());
  }
});

Template.selectRoleModal.helpers({
  rolesList: function() {
    return Meteor.roles.find({name: {
      $regex: Session.get('selectRoleFilter'),
      $options: 'i'
    }});
  },
  getSearchTerm: function(){
    return Session.get('selectRoleFilter');
  }
});