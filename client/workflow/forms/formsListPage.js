Session.setDefault('receivedData', false);
Session.setDefault('formSearchFilter', '');
Session.setDefault('formTableLimit', 20);
Session.setDefault('formPaginationCount', 1);
Session.setDefault('formSelectedPagination', 0);
Session.setDefault('formSkipCount', 0);

// Meteor.autorun(function(){
//   Meteor.subscribe('customerAccounts');
// });

//------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('formsListPage', {
    path: '/forms',
    template: 'formsListPage',
    yieldTemplates: {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }
    },
    onBeforeAction: function() {
      setPageTitle("Forms");
    },
    waitOn: function(){
      return Meteor.subscribe('forms');
    }
  });
});

//------------------------------------------------
// HELPERS

Template.formsListPage.helpers({
  formsList: function(){
    Session.set('receivedData', new Date());
    Session.set('formPaginationCount', Math.floor(Forms.find().count() / Session.get('formTableLimit')));
    //return Forms.find({},{limit: Session.get('formTableLimit'), skip: Session.get('formSkipCount')});

    if(Session.get('formSearchFilter').length === 17){
      return Forms.find({_id: Session.get('formSearchFilter')});
    }else{
      return Forms.find({formName: {
        $regex: Session.get('formSearchFilter'),
        $options: 'i'
      }},{limit: Session.get('formTableLimit'), skip: Session.get('formSkipCount')});
    }
  },
  rendered: function(){
    $(this.find('#formsTable')).tablesorter();

    Deps.autorun(function(){
      console.log(Session.get('receivedData'))
      setTimeout(function(){
        $("#formsTable").trigger("update");
      }, 200);
    });
  }
});




Template.formsListPage.events({
  'keyup #formSearchInput':function(){
    Session.set('formSearchFilter', $('#formSearchInput').val());
  },
  'click #twentyButton':function(){
    Session.set('formTableLimit', 20);
  },
  'click #fiftyButton': function(){
    Session.set('formTableLimit', 50);
  },
  'click #hundredButton': function(){
    Session.set('formTableLimit', 100);
  },
  'click .pagination-btn':function(){
    //alert(JSON.stringify(this.index));
    Session.set('formSelectedPagination', this.index);
    Session.set('formSkipCount', this.index * Session.get('formTableLimit'));
  },
  'click .individualFormRow':function(){
    Session.set('currentForm', this._id);
    Router.go('/form/' + this._id);
    //alert(this._id);
  }
});


Template.formsListPage.helpers({
  getPaginationCount: function(){
    return Session.get('formPaginationCount');
  },
  formsPaginationButtonList: function(){
    var paginationArray = [];
    for (var i = 0; i < Session.get('formPaginationCount'); i++) {
      paginationArray[i] = {
        index: i
      };
    };
    return paginationArray;
  },
  isTwentyActive: function(){
    if(Session.get('formTableLimit') === 20){
      return "active";
    }
  },
  isFiftyActive: function(){
    if(Session.get('formTableLimit') === 50){
      return "active";
    }
  },
  isHundredActive: function(){
    if(Session.get('formTableLimit') === 100){
      return "active";
    }
  }
});



Template.formsPaginationButton.helpers({
  pageActive: function(){
    if(this.index === Session.get('formSelectedPagination')){
      return "active";
    }
  },
  getPage: function(){
    return this.index + 1;
  }
});


Template.formRowItem.events({
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

Template.formRowItem.helpers({
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
    }
  }
});
