
Router.map(function(){
  this.route('commentsRecordPage', {
    path: '/comments/:id',
    template: 'commentsRecordPage',
    onBeforeAction: function(){
      Session.set('currentForm', this.params.id);
    },
    onWait: function(){
      return Meteor.subscribe('comments');
    },
    data: function () {
      return Comments.findOne({_id: this.params.id});
    },
  });
});
Template.commentsRecordPage.events({
  'click #editCommentButton':function(){
    Router.go('/edit/comment/' + this._id);
  },
  'click #subjectDeleteButton':function(){
    if(confirm('Are you sure you want to delete ' + this._id + "?")){
      Comments.remove({_id: this._id});
      Router.go('/');
    }
  }
});

Template.commentsRecordPage.helpers({
  getTitle:function(){
    if(this.title){
      return this.title;
    }else{
      return "---";
    }
  }
});
