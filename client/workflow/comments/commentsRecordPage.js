
Router.map(function(){
  this.route('commentsRecordPage', {
    path: '/comments/:id',
    template: 'commentsRecordPage',
    onWait: function(){
      return Meteor.subscribe('comments');
    },
    data: function () {
      Session.set('currentForm', this.params.id);
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
