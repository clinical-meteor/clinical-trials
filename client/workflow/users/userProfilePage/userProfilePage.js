Router.map(function(){
  this.route('userProfileRoute', {
    path: '/users/:id',
    template: 'userProfilePage',
    waitOn: function(){
      //Meteor.subscribe('settings');
      //return Meteor.subscribe('userProfile', this.params.id);
      return Meteor.subscribe('usersDirectory');
    },
    data: function () {
      Session.set('selectedUser', this.params.id);
      return Meteor.users.findOne({_id: this.params.id});
    },
    onAfterAction: function() {
      //Session.set('modalReturnRoute', false);
      Session.set('isOnListPage', false);
    }
  });
});


Template.userProfilePage.events({
  'click #editProfileButton':function(){
    Router.go('/user/edit/' + this._id);
  },
  'click #deleteProfileButton':function(){
    $('#removeUserModal').modal("show");

    // var userIsSure = confirm("Are you sure you want to delete user " + this._id);
    // if(userIsSure){
    //   Meteor.call('removeUser', this._id);
    //   Router.go('/users/');
    // }
  }
});

Template.userProfilePage.helpers({
  getSelectedCampaignId: function(){
    if(Meteor.user()){
      if(Meteor.user().profile){
        return Meteor.user().profile.selected_campaign_id;
      }else{
        return 'Campaign Id not found.';
      }
    }else{
      return 'User Profile Id not found.';
    }
  },
  getSelectedCampaignName: function(){
    if(Meteor.user()){
      if(Meteor.user().profile){
        return Meteor.user().profile.selected_campaign;
      }else{
        return 'Campaign not found.';
      }
    }else{
      return 'User Profile not found.';
    }
  },
  getEmployerId: function(){
    if(Meteor.user()){
      if(Meteor.user().profile){
        if(Meteor.user().profile.employer_id){
          return Meteor.user().profile.employer_id;
        }
        else{
          return "---";
        }
      }
    }else{
      return "---";
    }
  },
  getEmployerName: function(){
    if(Meteor.user()){
      if(Meteor.user().profile){
        if(Meteor.user().profile.employer){
          return Meteor.user().profile.employer;
        }
        else{
          return "---";
        }
      }
    }else{
      return "---";
    }
  },
  getEmployerInvitationId: function(){
    if(Meteor.user()){
      if(Meteor.user().profile){
        if(Meteor.user().profile.employer_invitation_id){
          return Meteor.user().profile.employer_invitation_id;
        }
        else{
          return "---";
        }
      }
    }else{
      return "---";
    }
  },
  getEmployerInvitationName: function(){
    if(Meteor.user()){
      if(Meteor.user().profile){
        if(Meteor.user().profile.employer_invitation){
          return Meteor.user().profile.employer_invitation;
        }
        else{
          return "---";
        }
      }
    }else{
      return "---";
    }
  }


});
