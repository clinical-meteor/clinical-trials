Session.setDefault('sponsorSearchFilter', '');
Session.setDefault('selectedSponsor', null);


Template.sponsorSearchModal.events({
  'click .list-group-item':function(){
    Session.set('selectedSponsor', {
      _id: this._id,
      name: this.name
    });
  },
  'keyup #sponsorSearchModalInput':function(){
    Session.set('sponsorSearchFilter', $('#sponsorSearchModalInput').val());
  }
});


Template.sponsorSearchModal.helpers({
  sponsorList: function() {
    return Sponsors.find({name: {
      $regex: Session.get('sponsorSearchFilter'),
      $options: 'i',
      $ne: 'Default Sponsor'
    }});
  },
  getSearchTerm: function(){
    return Session.get('sponsorSearchFilter');
  }
});