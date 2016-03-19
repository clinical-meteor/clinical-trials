

Router.map(function(){
  this.route('sponsorRecordRoute', {
    path: '/sponsor/:id',
    template: 'sponsorsRecordPage',
    waitOn: function(){
      Meteor.subscribe('settings');
      return Meteor.subscribe('sponsors');
    },
    data: function () {
      return Sponsors.findOne({_id: this.params.id});
    }
  });
});





Template.sponsorsRecordPage.events({
  'click #editSponsorButton':function(){
    Router.go('/editsponsor/'  + this._id._str);
  },
  'click #deleteSponsorButton':function(){
    var userIsSure = confirm("Are you sure you want to delete sponsor #" + this._id._str);
    if(userIsSure){
      Sponsors.remove({_id: this._id});
      Router.go('/sponsors/');
    }
  },
  getSponsorName: function(){
    return this.name;
  },
  sponsorRecord: function(){
    if(this){
      return Sponsors.findOne(this._id);
    }else{
      return {
        name: "---",
        description: "---",
        url: "---",
        owner: "---",
        owner_id: "---"
      };
    }
  }
});
