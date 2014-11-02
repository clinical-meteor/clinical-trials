Session.setDefault('receivedData', false);
Session.setDefault('subjectSearchFilter', '');
Session.setDefault('subjectTableLimit', 20);
Session.setDefault('subjectPaginationCount', 1);
Session.setDefault('subjectSelectedPagination', 0);
Session.setDefault('subjectSkipCount', 0);

// Meteor.autorun(function(){
//   Meteor.subscribe('customerAccounts');
// });

//------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('subjectsListPage', {
    path: '/subjects',
    template: 'subjectsListPage',
    yieldTemplates: {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }
    },
    waitOn: function(){
      return Meteor.subscribe('subjects');
    }
  });
});

//------------------------------------------------
// HELPERS

Template.subjectsListPage.helpers({
  subjectsList: function(){
    Session.set('receivedData', new Date());
    Session.set('subjectPaginationCount', Math.floor(Subjects.find().count() / Session.get('subjectTableLimit')));
    //return Forms.find({},{limit: Session.get('subjectTableLimit'), skip: Session.get('subjectSkipCount')});

    if(Session.get('subjectSearchFilter').length === 17){
      return Subjects.find({_id: Session.get('subjectSearchFilter')});
    }else{
      return Subjects.find({name: {
        $regex: Session.get('subjectSearchFilter'),
        $options: 'i'
      }},{limit: Session.get('subjectTableLimit'), skip: Session.get('subjectSkipCount')});
    }
  },
  rendered: function(){
    $(this.find('#subjectsTable')).tablesorter();

    Deps.autorun(function(){
      console.log(Session.get('receivedData'))
      setTimeout(function(){
        $("#subjectsTable").trigger("update");
      }, 200);
    });
  }
});




Template.subjectsListPage.events({
  'keyup #subjectSearchInput':function(){
    Session.set('subjectSearchFilter', $('#subjectSearchInput').val());
  },
  'click #twentyButton':function(){
    Session.set('subjectTableLimit', 20);
  },
  'click #fiftyButton': function(){
    Session.set('subjectTableLimit', 50);
  },
  'click #hundredButton': function(){
    Session.set('subjectTableLimit', 100);
  },
  'click .pagination-btn':function(){
    //alert(JSON.stringify(this.index));
    Session.set('subjectSelectedPagination', this.index);
    Session.set('subjectSkipCount', this.index * Session.get('subjectTableLimit'));
  },
  'click .individualFormRow':function(){
    Session.set('currentForm', this._id);
    Router.go('/subjects/' + this._id);
    //alert(this._id);
  },
  'click #createSubjectButton':function(){
    Router.go('/new/subject/');
  }
});


Template.subjectsListPage.helpers({
  getPaginationCount: function(){
    return Session.get('subjectPaginationCount');
  },
  subjectsPaginationButtonList: function(){
    var paginationArray = [];
    for (var i = 0; i < Session.get('subjectPaginationCount'); i++) {
      paginationArray[i] = {
        index: i
      };
    };
    return paginationArray;
  },
  isTwentyActive: function(){
    if(Session.get('subjectTableLimit') === 20){
      return "active";
    }
  },
  isFiftyActive: function(){
    if(Session.get('subjectTableLimit') === 50){
      return "active";
    }
  },
  isHundredActive: function(){
    if(Session.get('subjectTableLimit') === 100){
      return "active";
    }
  }
});



Template.subjectsPaginationButton.helpers({
  pageActive: function(){
    if(this.index === Session.get('subjectSelectedPagination')){
      return "active";
    }
  },
  getPage: function(){
    return this.index + 1;
  }
});


Template.subjectRowItem.events({

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

Template.subjectRowItem.helpers({
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
    }
  }
});
