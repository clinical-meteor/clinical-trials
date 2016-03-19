Session.setDefault('activeQuestion', false);

Router.map(function(){
  this.route('dataPreviewPage', {
    path: '/data/:id',
    template: 'dataPreviewPage',
    data: function () {
      console.log('routing to: /data/', this.params.id);
      Session.set('currentDataRecord', this.params.id);
      Session.set('selectedDataRecord', this.params.id);
      var record = Data.findOne({_id: this.params.id});
      if(record){
        HipaaLogger.logEvent("viewed", Meteor.userId(), "Data", this.params.id, null, record.subjectId, record.subjectName);
      }
      return record;
    },
    onAfterAction: function(){
      Session.set('activeQuestion', false);
    }
  });
});
Template.dataPreviewPage.events({
  'click .resolvedButton':function(){
    Comments.insert({
      createdAt: new Date(),
      text: "Resolved.",
      owner: Meteor.user().profile.name,
      owner_id: Meteor.userId(),
      question_id: this._id
    });
    $(event.target).val("");
    Session.set('activeQuestion', false);
  },
  'click .page':function(){
    Session.set('activeQuestion', false);
  },
  'click #previousVersionID':function(){
    var record = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log( 'clicked on panel footer ', record.previousVersion);
    Session.set('currentDataRecord', record.previousVersion);
    Router.go('/data/' + record.previousVersion);
  },
  'click .fa-trash-o':function(){
   Meteor.call('deleteDataRecord', Session.get('currentDataRecord'));
  },
  'click .fa-lock':function(){
   Meteor.call('lockDataRecord', Session.get('currentDataRecord'));
 },
 'keyup .comment-input': function(event){
   if(event.keyCode == 13){
     Comments.insert({
       createdAt: new Date(),
       text: $(event.target).val(),
       owner: Meteor.user().profile.name,
       owner_id: Meteor.userId(),
       question_id: this._id
     });
     $(event.target).val("");
   }
 }
});

Template.dataPreviewPage.helpers({
  answerHasComments: function(){
    var comments = Comments.find();
    if(comments.count() > 0){
      return true;
    }else{
      return false;
    }
  },
  questionsList: function(){
    return Comments.find({question_id: this._id});
  },
  isActiveQuestion: function(){
    if(Session.get('activeQuestion') === this._id){
      return Session.get('activeQuestion');
    }
  },
  dataSchema: function(){
    console.log('data.schema', this.schema);
    console.log('selectedDataRecord', Session.get('selectedDataRecord'));
    console.log('currentDataRecord', Session.get('currentDataRecord'));

    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);

    if(dataRecord){
      var form = Forms.findOne(dataRecord.schema_id);
      console.log('form', form);

      if(form){
        return form.schema;
      }else{
        return [];
      }
    }
  },
  getPublishText:function(){
    if(this.stared){
      return 'Unpublish Form';
    }else{
      return 'Publish Form';
    }
  },
  isPublished: function(){
    if(this.stared){
      return true;
    }else{
      return false;
    }
  },
  getFormName: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    //console.log('selectedDataRecord', Session.get('selectedDataRecord'));
    if(dataRecord){
      if(dataRecord.formName){
        return dataRecord.formName;
      }else{
        return "---";
      }
    }else{
      return 'No record.';
    }
  },
   getPreviousVersion: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    if(dataRecord){
      if(dataRecord.previousVersion){
        return dataRecord.previousVersion;
      }else{
        return "Initial Version";
      }
    }else{
      return 'No record.';
    }
  },
  //TODO need to redo this part, not right but works
   isInitialVersion: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    if(dataRecord){
      if(dataRecord.previousVersion){
        return false;
      }else{
        return true;
      }
    }else{
      return 'No record.';
    }
  },

  getCreatedBy: function(){
    var dataRecord = Data.findOne({_id: Session.get('currentDataRecord')});
    console.log('dataRecord', dataRecord);
    if(dataRecord){
      if(dataRecord.ownerUsername){
        return dataRecord.ownerUsername;
      }else{
        return "---";
      }
    }else{
      return 'No record.';
    }
  }
});
