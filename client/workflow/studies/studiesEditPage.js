Session.setDefault('selectedStudyId', false);
Session.setDefault('selectedSponsor', {_id: "---", name: "---"});
Session.setDefault('isDeletingFormFromStudy', false);


Router.map(function(){
  this.route('newStudyRoute', {
    path: '/new/study',
    template: 'studiesEditPage'
  });


  this.route('studiesEditRoute', {
    path: '/edit/study/:id',
    template: 'studiesEditPage',
    waitOn: function(){
      return Meteor.subscribe('studies');
    },
    data: function () {
      Session.set('selectedStudyId', this.params.id);
      return Studies.findOne({_id: this.params.id });
    }
  });
});



//------------------------------------------------
// EVENTS

Template.studiesEditPage.events({
  'click .visitLabel':function(){
    //alert(this);
    if(Session.get('isDeletingVisitFromStudy')){
      var dataPayload = {
        studyId: Session.get('selectedStudyId'),
        label: this.toString()
      }
      Meteor.call('removeVisitFromStudy', dataPayload, function(error, result){
        console.log(error);
        console.log(result);
      });
      Session.set('isDeletingVisitFromStudy', false);
    }
  },
  'click #addVisitToStudyButton':function(){
    Studies.update({_id: this._id}, {$addToSet:{
      'visits':$('#visitLabelInput').val()
    }});
    $('#visitLabelInput').val('');
  },
  'click #deleteVisitFromStudyButton':function(){
    Session.set('isDeletingVisitFromStudy', true);
  },
  'click .individualFormRow':function(){
    //alert('row ' + this._id + Session.get('selectedStudyId'));
    if(Session.get('isDeletingFormFromStudy')){
      Studies.update({_id: Session.get('selectedStudyId')},{$pull:{
        forms: this._id
      }});
      Session.set('isDeletingFormFromStudy', false);
    }
  },
  'click #deleteFormFromStudyButton':function(){
    Session.set('isDeletingFormFromStudy', true);
  },
  'click #addFormToStudyButton':function(){
    var self = this;
    //alert('add! ' + this._id);
    console.log('addingFormToStudy ' + this._id);
    Session.set('selectedStudyId', self._id);
    Session.set('showFormSearch', true);

    // $('#formSearchModal').modal("show");

    // $('#formSearchModal').on('hidden.bs.modal', function (e) {
    //   console.log('selectedFormId', Session.get('selectedFormId'));
    //   //var form = Session.get('selectedForm');
    //   if(self._id){
    //     Studies.update({_id: self._id}, {$addToSet:{
    //       forms: Session.get('selectedFormId')
    //     }});
    //   }
    //   Session.set('selectedFormId', null);
    // });
    Session.set('isDeletingFormFromStudy', false);
  },
  'click #deleteStudyButton':function(){
    console.log('deleteStudyButton.id', this._id);
    if(confirm('Are you sure you want to delete this record?')){
      Studies.remove({_id: this._id});
      Session.set('selectedSponsor', {_id: "---", name: "---"});
      Router.go('/studies');
    }
  },
  'click #findStudySponsorButton':function(){
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
  'click #saveStudyButton':function(){
    console.count('click #saveStudyButton');

    var sponsor = Session.get('selectedSponsor');

    var formObject = {
      name: $('#studyNameInput').val(),
      description: $('#studyDescriptionInput').val(),
      url: $('#studyUrlInput').val(),
      createdAt: new Date(),
      owner: Meteor.user().profile.name,
      owner_id: Meteor.userId(),
      sponsor: sponsor.name,
      sponsor_id: sponsor._id
    };

    if(this._id){
      console.count('this._id: ' + this._id);

      var recordId = Studies.update({_id: this._id},{$set:{
        name: formObject.name,
        description: formObject.description,
        url: formObject.url,
        owner: formObject.owner,
        owner_id: formObject.owner_id,
        sponsor: formObject.sponsor,
        sponsor_id: formObject.sponsor_id
      }});
      // console.log('Studies updated.  Now trying to rename other collections.')
      // Meteor.call('renameStudy', formObject, function(error, result){
      //   if(error){
      //     console.error(error);
      //   }
      //   if(result){
      //     console.log(result);
      //   }
      // });

    }else{
      var recordId = Studies.insert({
        name: formObject.name,
        description: formObject.description,
        url: formObject.url,
        owner: formObject.owner,
        owner_id: formObject.owner_id,
        creator: Meteor.user().profile.name,
        creator_id: Meteor.userId(),
        sponsor: formObject.sponsor,
        sponsor_id: formObject.sponsor_id,
        forms: [],
        timestamp: new Date(),
        active: false
      });
      console.log(recordId);

    }
    Router.go('/studies/');
  }
});



//------------------------------------------------
// HELPERS

Template.studiesEditPage.helpers({
  getVisitLabel: function(){
    return this;
  },
  isDeletingVisitView: function(){
    if(Session.get('isDeletingVisitFromStudy')){
      return "danger-striped";
    }
  },
  isDeletingView: function(){
    if(Session.get('isDeletingFormFromStudy')){
      return "danger-striped";
    }
  },
  notNewStudy:function(){
    if(this._id){
      return true;
    }else{
      return false;
    }
  },
  visitsList: function(){
    var study = Studies.findOne({_id: this._id});
    if(study){
      return study.visits;
    }else{
      return [];
    }
  },
  formsList: function(){
    var study = Studies.findOne({_id: this._id});
    if(study){
      return Forms.find({ _id: {$in: study.forms }});
    }else{
      return [];
    }
  },
  getStudySponsor: function(){
    return Session.get('selectedSponsor').name;
  },
  getStudyName: function(){
    if(this.name){
      return this.name;
    }else{
      return "New Study";
    }
  },
  selectedStudy: function(){
    console.log(Session.get('selectedStudyId'));
    if(Session.get('selectedStudyId')._id){
      return Studies.findOne({_id: Session.get('selectedStudyId')._id });
    }else{
      return {};
    }
  }
});
