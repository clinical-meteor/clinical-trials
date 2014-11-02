Session.setDefault('receivedData', false);
Session.setDefault('commentsSearchFilter', '');
Session.setDefault('commentsTableLimit', 20);
Session.setDefault('commentsPaginationCount', 1);
Session.setDefault('commentsSelectedPagination', 0);
Session.setDefault('commentsSkipCount', 0);

// Meteor.autorun(function(){
//   Meteor.subscribe('customerAccounts');
// });

//------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('commentsListPage', {
    path: '/comments',
    template: 'commentsListPage',
    yieldTemplates: {
      'navbarHeader': {
        to: 'header'
      },
      'navbarFooter': {
        to: 'footer'
      }
    },
    waitOn: function(){
      return Meteor.subscribe('comments');
    }
  });
});

//------------------------------------------------
// HELPERS

Template.commentsListPage.helpers({
  commentsList: function(){
    Session.set('receivedData', new Date());
    Session.set('commentsPaginationCount', Math.floor(Comments.find().count() / Session.get('commentsTableLimit')));
    //return Forms.find({},{limit: Session.get('commentsTableLimit'), skip: Session.get('commentsSkipCount')});

    // if(Session.get('commentsSearchFilter').length === 17){
    //   return Comments.find({_id: Session.get('commentsSearchFilter')});
    // }else{
    //   return Comments.find({title: {
    //     $regex: Session.get('commentsSearchFilter'),
    //     $options: 'i'
    //   }},{limit: Session.get('commentsTableLimit'), skip: Session.get('commentsSkipCount')});
    // }
    return Comments.find();
  },
  rendered: function(){
    $(this.find('#commentsTable')).tablesorter();

    Deps.autorun(function(){
      console.log(Session.get('receivedData'))
      setTimeout(function(){
        $("#commentsTable").trigger("update");
      }, 200);
    });
  }
});




Template.commentsListPage.events({
  'keyup #commentsSearchInput':function(){
    Session.set('commentsSearchFilter', $('#commentsSearchInput').val());
  },
  'click #twentyButton':function(){
    Session.set('commentsTableLimit', 20);
  },
  'click #fiftyButton': function(){
    Session.set('commentsTableLimit', 50);
  },
  'click #hundredButton': function(){
    Session.set('commentsTableLimit', 100);
  },
  'click .pagination-btn':function(){
    //alert(JSON.stringify(this.index));
    Session.set('commentsSelectedPagination', this.index);
    Session.set('commentsSkipCount', this.index * Session.get('commentsTableLimit'));
  },
  'click .individualFormRow':function(){
    Session.set('currentForm', this._id);
    Router.go('/comments/' + this._id);
    //alert(this._id);
  },
  'click #createCommentButton':function(){
      Router.go('/new/comment')
  }
});


Template.commentsListPage.helpers({
  getPaginationCount: function(){
    return Session.get('commentsPaginationCount');
  },
  commentsPaginationButtonList: function(){
    var paginationArray = [];
    for (var i = 0; i < Session.get('commentsPaginationCount'); i++) {
      paginationArray[i] = {
        index: i
      };
    };
    return paginationArray;
  },
  isTwentyActive: function(){
    if(Session.get('commentsTableLimit') === 20){
      return "active";
    }
  },
  isFiftyActive: function(){
    if(Session.get('commentsTableLimit') === 50){
      return "active";
    }
  },
  isHundredActive: function(){
    if(Session.get('commentsTableLimit') === 100){
      return "active";
    }
  }
});



// Template.commentsPaginationButton.helpers({
//   pageActive: function(){
//     if(this.index === Session.get('commentsSelectedPagination')){
//       return "active";
//     }
//   },
//   getPage: function(){
//     return this.index + 1;
//   }
// });


Template.commentRowItem.events({
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

Template.commentRowItem.helpers({
  getCreatedAt: function(){
    return moment(this.createdAt).format('YYYY-MM-DD hh:mm a');
  },
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
    }
  }
});
