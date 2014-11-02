Session.setDefault('receivedData', false);
Session.setDefault('dataSearchFilter', '');
Session.setDefault('dataTableLimit', 20);
Session.setDefault('dataPaginationCount', 1);
Session.setDefault('dataSelectedPagination', 0);
Session.setDefault('dataSkipCount', 0);

Session.setDefault('activeFilter', true);
// ROUTING

Router.map(function(){
  this.route('dataListPage', {
    path: '/data',
    template: 'dataListPage',
    yieldTemplates: {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }
    },
    onBeforeAction: function() {
      setPageTitle("Data Entry");
    },
    waitOn: function(){
      return Meteor.subscribe('data');
    }
  });
});

//------------------------------------------------
// HELPERS

Template.dataListPage.helpers({
  dataList: function(){
    Session.set('receivedData', new Date());
    Session.set('dataPaginationCount', Math.floor(Forms.find().count() / Session.get('dataTableLimit')));
    Session.set( 'currentDataRecord', false );  // null out currentRecord
    //return Data.find();

    if(Session.get('dataSearchFilter').length === 17){
      return Data.find({$or:[
        {_id: Session.get('dataSearchFilter')},
        {schema_id: Session.get('dataSearchFilter')}
        ], active: Session.get('activeFilter')});
    }else{
      return Data.find({formName: {
        $regex: Session.get('dataSearchFilter'),
        $options: 'i'
      }, active: Session.get('activeFilter')},{limit: Session.get('dataTableLimit'), skip: Session.get('dataSkipCount')});
    }
  },
  rendered: function(){
    $(this.find('#dataTable')).tablesorter();

    Deps.autorun(function(){
      console.log(Session.get('receivedData'))
      setTimeout(function(){
        $("#dataTable").trigger("update");
      }, 200);
    });
  }
});




Template.dataListPage.events({
  'keyup #dataSearchInput':function(){
    Session.set('dataSearchFilter', $('#dataSearchInput').val());
  },
  'click #twentyButton':function(){
    Session.set('dataTableLimit', 20);
  },
  'click #fiftyButton': function(){
    Session.set('dataTableLimit', 50);
  },
  'click #hundredButton': function(){
    Session.set('dataTableLimit', 100);
  },
  'click .pagination-btn':function(){
    //alert(JSON.stringify(this.index));
    Session.set('dataSelectedPagination', this.index);
    Session.set('dataSkipCount', this.index * Session.get('dataTableLimit'));
  },
  'click .dataRow':function(){
    Session.set('currentDataRecord', this._id);
    //Router.go('/form/' + this.schema_id);
    Router.go('/data/' + this._id);

  }
});


Template.dataListPage.helpers({
  getPaginationCount: function(){
    return Session.get('dataPaginationCount');
  },
  dataPaginationButtonList: function(){
    var paginationArray = [];
    for (var i = 0; i < Session.get('dataPaginationCount'); i++) {
      paginationArray[i] = {
        index: i
      };
    };
    return paginationArray;
  },
  isTwentyActive: function(){
    if(Session.get('dataTableLimit') === 20){
      return "active";
    }
  },
  isFiftyActive: function(){
    if(Session.get('dataTableLimit') === 50){
      return "active";
    }
  },
  isHundredActive: function(){
    if(Session.get('dataTableLimit') === 100){
      return "active";
    }
  }
});



Template.dataPaginationButton.helpers({
  pageActive: function(){
    if(this.index === Session.get('dataSelectedPagination')){
      return "active";
    }
  },
  getPage: function(){
    return this.index + 1;
  }
});


Template.dataRowItem.events({
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

Template.dataRowItem.helpers({
  getSubjectName: function(){
    if(this.subjectName){
      return this.subjectName;
    }else{
      return "---";
    }
  },
  getCommentsIcon: function(){
    var result = "";

    // lets look through each answer in the form questionaire
    for(var index in this.data){
      if(this.data.hasOwnProperty(index)){

        // on each record, we look through the comments
        var comments = Comments.find({question_id: index}).fetch();

        // if we find any comments that match
        if(comments.length > 0){
          if(result === ""){
            result = "fa-comments primary-color";
          }

          // look to the last one
          // if it's marked as 'resolved'
          var comment = comments[comments.length - 1];
          if(comment.text === "Resolved."){
            // display the open comments icon
            result = "fa-comments-o";
          }
        }
      }
    }
    return result;
  },
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
    }
  }
});
