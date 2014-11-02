Session.setDefault('receivedData', false);
Session.setDefault('studySearchFilter', '');
Session.setDefault('studyTableLimit', 20);
Session.setDefault('studyPaginationCount', 1);
Session.setDefault('studySelectedPagination', 0);
Session.setDefault('studySkipCount', 0);

// Meteor.autorun(function(){
//   Meteor.subscribe('customerAccounts');
// });

//------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('studiesListPage', {
    path: '/studies',
    template: 'studiesListPage',
    yieldTemplates: {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }
    },
    onBeforeAction: function() {
      setPageTitle("Studies");
    },
    waitOn: function(){
      return Meteor.subscribe('studies');
    }
  });
});

//------------------------------------------------
// HELPERS

Template.studiesListPage.helpers({
  studiesList: function(){
    Session.set('receivedData', new Date());
    Session.set('studyPaginationCount', Math.floor(Studies.find().count() / Session.get('studyTableLimit')));
    //return Forms.find({},{limit: Session.get('studyTableLimit'), skip: Session.get('studySkipCount')});

    if(Session.get('studySearchFilter').length === 17){
      return Studies.find({_id: Session.get('studySearchFilter')});
    }else{
      return Studies.find({name: {
        $regex: Session.get('studySearchFilter'),
        $options: 'i'
      }},{limit: Session.get('studyTableLimit'), skip: Session.get('studySkipCount')});
    }
  },
  rendered: function(){
    $(this.find('#studiesTable')).tablesorter();

    Deps.autorun(function(){
      console.log(Session.get('receivedData'))
      setTimeout(function(){
        $("#studiesTable").trigger("update");
      }, 200);
    });
  }
});




Template.studiesListPage.events({
  'keyup #studySearchInput':function(){
    Session.set('studySearchFilter', $('#studySearchInput').val());
  },
  'click #twentyButton':function(){
    Session.set('studyTableLimit', 20);
  },
  'click #fiftyButton': function(){
    Session.set('studyTableLimit', 50);
  },
  'click #hundredButton': function(){
    Session.set('studyTableLimit', 100);
  },
  'click .pagination-btn':function(){
    //alert(JSON.stringify(this.index));
    Session.set('studySelectedPagination', this.index);
    Session.set('studySkipCount', this.index * Session.get('studyTableLimit'));
  },
  'click .individualFormRow':function(){
    Session.set('currentForm', this._id);
    Router.go('/studies/' + this._id);
    //alert(this._id);
  },
  'click #createStudyButton':function(){
    Router.go('/new/study/');
  }
});


Template.studiesListPage.helpers({
  getPaginationCount: function(){
    return Session.get('studyPaginationCount');
  },
  studiesPaginationButtonList: function(){
    var paginationArray = [];
    for (var i = 0; i < Session.get('studyPaginationCount'); i++) {
      paginationArray[i] = {
        index: i
      };
    };
    return paginationArray;
  },
  isTwentyActive: function(){
    if(Session.get('studyTableLimit') === 20){
      return "active";
    }
  },
  isFiftyActive: function(){
    if(Session.get('studyTableLimit') === 50){
      return "active";
    }
  },
  isHundredActive: function(){
    if(Session.get('studyTableLimit') === 100){
      return "active";
    }
  }
});



Template.studiesPaginationButton.helpers({
  pageActive: function(){
    if(this.index === Session.get('studySelectedPagination')){
      return "active";
    }
  },
  getPage: function(){
    return this.index + 1;
  }
});


Template.studyRowItem.events({

  'click .fa-star':function(){
    Forms.update({_id: this._id}, {$set:{
      'stared':false
    }});
  },
  'click .fa-star-o':function(){
    Forms.update({_id: this._id}, {$set:{
      'stared':true
    }});

  }
});

Template.studyRowItem.helpers({
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
    }
  }
});
