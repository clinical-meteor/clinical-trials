Template.homePage.events({
  'click #formBuilderTile':function(){
    Router.go('/builder');
  },
  'click #savedFormsTile':function(){
    Router.go('/forms');
  },
  'click #collectedDataTile':function(){
    Router.go('/data');
  },
  'click #sponsorsTile':function(){
    Router.go('/sponsors');
  },
  'click #usersTile':function(){
    Router.go('/users');
  },
  'click #subjectsTile':function(){
    Router.go('/subjects');
  },
  'click #commentsTile':function(){
    Router.go('/comments');
  },
  'click #studiesTile':function(){
    Router.go('/studies');
  },
  'click #auditTile':function(){
    Router.go('/audit');
  },
  // 'click #auditTile':function(){
  //   Router.go('/audit');
  // },

  'click .activeStudy':function(){
    Session.set('selectedSubject', false);
  }
});



Template.homePage.helpers({
  studiesList: function(){
    return Studies.find();
  },
});
