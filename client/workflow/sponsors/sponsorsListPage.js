Session.setDefault('sponsorsListSearchFilter', '');
Session.setDefault('sponsorsListPaginationCount', 1);
Session.setDefault('sponsorsListSelectedPagination', 0);
Session.setDefault('sponsorsListSkipCount', 0);

// TODO: refactor usersListTableLimit to usersListTableEntriesLimit
Session.setDefault('sponsorsListTableLimit', 50);



Router.map(function(){
  this.route('sponsorsListRoute', {
    path: '/sponsors',
    template: 'sponsorsListPage',
    waitOn: function(){
      Meteor.subscribe('settings');
      return Meteor.subscribe('sponsors');
    },
    onAfterAction: function() {
      Session.set('currentPage', 'sponsorsListPage');
      Session.set('isOnListPage', true);
    }
  });
});






//TODO: refactor sponsorsListBlock to sponsorsListPage
Template.sponsorsListPage.helpers({
  sponsorsList: function () {
    Session.set('sponsorsListReceivedData', new Date());
    Session.set('sponsorsListPaginationCount', Math.floor(Sponsors.find().count() / Session.get('sponsorsListTableLimit')));

    if(ClinicalTrials.checkForHexCode.test(Session.get('sponsorsListSearchFilter'))){
      return Sponsors.find({_id: new Meteor.Collection.ObjectID(Session.get('sponsorsListSearchFilter'))});
    }else{
      return Sponsors.find({$or:[
          {name: {
            $regex: Session.get('sponsorsListSearchFilter'),
            $options: 'i'
          }},
          {name: { $regex: Session.get('sponsorsListSearchFilter'), $options: 'i' }},
          {description: { $regex: Session.get('sponsorsListSearchFilter'), $options: 'i' }},
          {owner: { $regex: Session.get('sponsorsListSearchFilter'), $options: 'i' }}
        ]},{
          limit: Session.get('sponsorsListTableLimit'),
          skip: Session.get('sponsorsListSkipCount'),
          sort: {name: 1}
        });

    }
    //return Sponsors.find({},{sort: {_id: -1}});
  },
  rendered: function(){
    $(this.find('#sponsorsTable')).tablesorter();

    Deps.autorun(function(){
      setTimeout(function(){
        $("#sponsorsTable").trigger("update");
      }, 200);
    });
  }
});


Template.sponsorsListPage.events({
  'click .sponsorListItem': function () {
    Session.set('selectedSponsorId', {
      _id: this._id,
      name: this.name
    });
    Router.go('/sponsor/' + this._id);
  },
  'keyup #sponsorsSearchInput':function(){
    Session.set('sponsorsListSearchFilter', $('#sponsorsSearchInput').val());
  },
  'click #createSponsorButton':function(){
    Router.go('/newsponsor');
    //alert('click');
  }
});





Template.sponsorListItem.getId = function(){
  if(this._id){
    if(this._id._str){
      return this._id._str;
    }else{
      return this._id;
    }
  }else{
    return "---";
  }
};

// sorry, this has a lot of double negatives
Template.sponsorsListPage.isCrudPattern = function(){
  if(Session.get('modalReturnRoute')){
    return false;
  }else{
    return true;
  }
}
