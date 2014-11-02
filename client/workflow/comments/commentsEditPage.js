Session.setDefault('selectedCommentId', false);
Session.setDefault('selectedSponsor', {_id: "---", name: "---"});
Session.setDefault('isDeletingFormFromComment', false);


Router.map(function(){
  this.route('newCommentRoute', {
    path: '/new/comment',
    template: 'commentsEditPage',
    onBeforeAction: function(){
      setPageTitle("New Comment");
    }
  });


  this.route('subjectsEditRoute', {
    path: '/edit/comment/:id',
    template: 'commentsEditPage',
    onBeforeAction: function(){
      setPageTitle("Edit Comment");
      Session.set('selectedCommentId', this.params.id);
    },
    waitOn: function(){
      return Meteor.subscribe('subjects');
    },
    data: function () {
      return Comments.findOne({_id: this.params.id });
    }
  });
});



//------------------------------------------------
// EVENTS

Template.commentsEditPage.events({
  'click .individualFormRow':function(){
    //alert('row ' + this._id + Session.get('selectedCommentId'));
    if(Session.get('isDeletingFormFromComment')){
      Comments.update({_id: Session.get('selectedCommentId')},{$pull:{
        forms: this._id
      }});
      Session.set('isDeletingFormFromComment', false);
    }
  },
  'click #deleteCommentButton':function(){
    console.log('deleteCommentButton.id', this._id);
    if(confirm('Are you sure you want to delete this record?')){
      Comments.remove({_id: this._id});
      Session.set('selectedSponsor', {_id: "---", name: "---"});
      Router.go('/comments');
    }
  },
  'click #findCommentSponsorButton':function(){
    var self = this;
    //console.log('this.id', this._id);
    //if(ClinicalTrials.isAdminedBy(Meteor.userId())){
      Session.set('selectedUser', Meteor.userId());

      $('#sponsorSearchModal').modal("show");

      $('#sponsorSearchModal').on('hidden.bs.modal', function (e) {
        //Session.get('selectedSponsor');


        //Session.set('selectedSponsor', null);
      });

    //}else{
    //  Session.set('promptTitle', 'User Not Assigned to a Sponsor');
    //  Session.set('promptMessage', 'Please contact your administrator and have them set your employer.');
    //  $('#promptModal').modal("show");
    //}
  },
  'click #saveCommentButton':function(){
    console.count('click #saveCommentButton');

    var formObject = {
      title: $('#commentTitleInput').val(),
      text: $('#commentTextInput').val(),
      owner: Meteor.user().profile.name,
      owner_id: Meteor.userId()
    };

    if(this._id){
      console.count('this._id: ' + this._id);

      var recordId = Comments.update({_id: this._id},{$set:{
        title: formObject.title,
        text: formObject.text,
        owner: formObject.owner,
        owner_id: formObject.owner_id
      }});

    }else{
      var recordId = Comments.insert({
        title: formObject.title,
        text: formObject.text,
        owner: formObject.owner,
        owner_id: formObject.owner_id,
        createdAt: new Date()
      });
      console.log(recordId);

    }
    Router.go('/comments/');
  }
});



//------------------------------------------------
// HELPERS

Template.commentsEditPage.helpers({
  notNewComment:function(){
    if(this._id){
      return true;
    }else{
      return false;
    }
  },
  selectedComment: function(){
    console.log(Session.get('selectedCommentId'));
    if(Session.get('selectedCommentId')._id){
      return Comments.findOne({_id: Session.get('selectedCommentId')._id });
    }else{
      return {};
    }
  }
});
