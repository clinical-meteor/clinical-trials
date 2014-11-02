Session.setDefault('selectedSponsorId', false);


Router.map(function(){
  this.route('newSponsorRoute', {
    path: '/newsponsor',
    template: 'sponsorsEditPage',
    onBeforeAction: function(){
      setPageTitle("New Sponsor");
    }
  });


  this.route('sponsorsEditRoute', {
    path: '/editsponsor/:id',
    template: 'sponsorsEditPage',
    onBeforeAction: function(){
      setPageTitle("Edit Sponsor");
    },
    waitOn: function(){
      return Meteor.subscribe('sponsors');
    },
    data: function () {
      return Sponsors.findOne({_id: this.params.id });
    }
  });
});


//------------------------------------------------
// DATA LAYER

Template.sponsorsEditPage.selectedSponsor = function(){
  console.log(Session.get('selectedSponsorId'));
  if(Session.get('selectedSponsorId')._id){
    return Sponsors.findOne({_id: Session.get('selectedSponsorId')._id });
  }else{
    return {};
  }
};

//------------------------------------------------
// EVENTS

Template.sponsorsEditPage.events({
  'click #saveSponsorButton':function(){
    console.count('click #saveSponsorButton');
    if(this._id){
      console.count('this._id: ' + this._id);

      var formObject = {
        _id: this._id,
        name: $('#sponsorNameInput').val(),
        description: $('#sponsorDescriptionInput').val(),
        url: $('#sponsorUrlInput').val(),
        createdAt: new Date(),
        owner: Meteor.user().profile.name,
        owner_id: Meteor.userId()
      };

      console.log('Sponsors updated.  Now trying to rename other collections.')
      Meteor.call('renameSponsor', formObject, function(error, result){
        if(error){
          console.error(error);
        }
        if(result){
          console.log(result);
        }
      });

    }else{
      var recordId = Sponsors.insert({
        name: $('#sponsorNameInput').val(),
        description: $('#sponsorDescriptionInput').val(),
        url: $('#sponsorUrlInput').val(),
        invite_code: $('#sponsorInviteCodeInput').val(),
        owner: Meteor.user().profile.name,
        owner_id: Meteor.userId(),
        creator: Meteor.user().profile.name,
        creator_id: Meteor.userId(),
        timestamp: new Date()
      });
      console.log(recordId);


    }
    Router.go('/sponsors/');
  }
});

Template.sponsorsEditPage.getSponsorName = function(){
  if(this.name){
    return this.name;
  }else{
    return "New Sponsor";
  }
};
