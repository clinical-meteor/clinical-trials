Session.setDefault('usersListReceivedData', false);
Session.setDefault('usersListSearchFilter', '');
Session.setDefault('usersListPaginationCount', 1);
Session.setDefault('usersListSelectedPagination', 0);
Session.setDefault('usersListSkipCount', 0);

// TODO: refactor usersListTableLimit to usersListTableEntriesLimit
Session.setDefault('usersListTableLimit', 20);


Router.map(function(){
  this.route('usersListRoute', {
    path: '/users',
    template: 'usersListPage',
    onBeforeAction: function(){
      setPageTitle("Users List");
    },
    waitOn: function(){
      Meteor.subscribe('settings');
      return Meteor.subscribe('usersDirectory');
    },
    onAfterAction: function() {
      Session.set('isOnListPage', true);
    }
  });
});

Template.usersListPage.helpers({
    userInList: function(){
      Session.set('usersListReceivedData', new Date());
      Session.set('usersListPaginationCount', Math.floor(Meteor.users.find().count() / Session.get('usersListTableLimit')));

      if(ClinicalTrials.checkForHexCode.test(Session.get('usersListSearchFilter'))){
        return Meteor.users.find({_id: new Meteor.Collection.ObjectID(Session.get('usersListSearchFilter'))});
      }else{
        return Meteor.users.find({$or:[
          {username: { $regex: Session.get('usersListSearchFilter'), $options: 'i' }},
          {role: { $regex: Session.get('usersListSearchFilter'), $options: 'i' }},
          {'profile.name': { $regex: Session.get('usersListSearchFilter'), $options: 'i' }},
          {'profile.role': { $regex: Session.get('usersListSearchFilter'), $options: 'i' }},
          {'profile.employer': { $regex: Session.get('usersListSearchFilter'), $options: 'i' }},
          {'email.address': { $regex: Session.get('usersListSearchFilter'), $options: 'i' }}

          ]},{limit: Session.get('usersListTableLimit'), skip: Session.get('usersListSkipCount')});
      }
    },
    getSearchValue: function(){
      return Session.get('usersListSearchFilter');
    },
    rendered: function(){
      $(this.find('#usersTable')).tablesorter();

      Deps.autorun(function(){
        setTimeout(function(){
          $("#usersTable").trigger("update");
        }, 200);
      });
    }
});

Template.usersListPage.events({
  'click tr':function(){
    if(this._id._str){
      Router.go('/users/' + this._id._str);
    }else{
      Router.go('/users/' + this._id);
    }
  },
  'keyup #usersSearchInput':function(){
    Session.set('usersListSearchFilter', $('#usersSearchInput').val());
  },
  'click #newUserButton':function(){
    Router.go('/user/new');
  }
});


//-------------------------------------------------------------
// USER LIST ITEM

Template.userListItem.events({
  'click .label':function(event){
    if(this.profile.active){
      Meteor.users.update({_id: this._id},{$set:{'profile.active': false }});
    }else{
      Meteor.users.update({_id: this._id},{$set:{'profile.active': true }});
    }
    event.stopPropagation();
  }
});
Template.userListItem.helpers({
  getEmail: function(){
    if(this.emails){
      return this.emails[0].address;
    }else{
      return '';
    }
  },
  getUserIdString: function(){
    return this._id._str;
  },
  getProfileCreatedAt: function(){
    return moment(this.createdAt).format("YYYY-MM-DD");
  }
});
