
Router.map(function(){
  this.route('subjectsRecordPage', {
    path: '/subjects/:id',
    template: 'subjectsRecordPage',
    onBeforeAction: function(){
      Session.set('currentForm', this.params.id);
    },
    onWait: function(){
      return Meteor.subscribe('subjects');
    },
    data: function () {
      return Subjects.findOne({_id: this.params.id});
    },
  });
});
Template.subjectsRecordPage.events({
  'click #editSubjectButton':function(){
    Router.go('/edit/subject/' + this._id);
  },
  'click #subjectDeleteButton':function(){
    if(confirm('Are you sure you want to delete ' + this._id + "?")){
      Subjects.remove({_id: this._id});
      Router.go('/');
    }
  }
});

Template.subjectsRecordPage.helpers({

});
