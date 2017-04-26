Template.navbarFooter.helpers({
  buildControls: function(){
    if(Router.current()){
      if(Router.current().url.includes('builder')){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  formControls: function(){
    if(Router.current()){
      if(Router.current().url.includes('form/')){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  userControls: function(){
    if(Router.current()){
      if(Router.current().url.includes('user/')){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  sponsorControls: function(){
    if(Router.current()){
      if(Router.current().url.includes('sponsor/')){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  dataControls: function(){
    if(Router.current()){
      if(Router.current().url.includes('data/')){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  isPublished: function(){
    var currentForm = Forms.findOne(Session.get('currentForm'));
    if(currentForm){
      if(currentForm.stared){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }
  },
  isApproved: function(){
    var dataRecord = Data.findOne(Session.get('currentDataRecord'));
    if(dataRecord){
      if(dataRecord.approved){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }
  },

  isDeleted: function(){
    var dataRecord = Data.findOne(Session.get('currentDataRecord'));
    if(dataRecord){
      if(dataRecord.deleted){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }
  },

  isLocked: function(){
    var dataRecord = Data.findOne(Session.get('currentDataRecord'));
    if(dataRecord){
      if(dataRecord.locked){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }

  }
});


Template.navbarFooter.events({
  'click #deleteUserRecordLink':function(){
    Meteor.call('removeUser', Session.get('selectedUser'), function(error, result){
      if(result){
        Meteor.go('/users');
      }
    });
  },
  'click #logOutLink':function(){
    Router.go('/sign-out');
  },
  'click #keybindingsLink':function(){
    $('#keybindingsModal').modal("show");
  },
  'click #promptLink':function(){
    $('#promptModal').modal("show");
  },
  'click #confirmLink':function(){
    $('#confirmModal').modal("show");
  },
  'click #errorToggleLink':function(){
    $('#errorPanel').sidebar('toggle');
  },
  'click #tutorialLink':function(){
    $('#tutorialModal').modal('show');
  },
  'click #panelToggleLink':function(){
    if(Meteor.user()){
      toggleWestPanel();
    }
  },
  'click #eastPanelToggleLink':function(){
    if(Meteor.user()){
      toggleWestPanel();
    }
  },

  //-----------------------------------------
  // BUILDER EVENTS

  // TODO refactor #saveFormLink to #saveBuilderLink
  'click #saveFormLink':function(){
    console.log('click #saveFormLink', this);
    saveForm(this);
  },
  // TODO refactor #clearFormLink to #clearBuilderLink
  'click #clearFormLink':function(){
    Meteor.call('dropForm');
    Session.set('selectedBuilderTab','addNewFieldTab');
  },


  //-----------------------------------------
  // DATA COLLECTION EVENTS

  'click #deleteDataLink':function(){
    if(confirm('Are you sure you want to delete this record?')){
      Meteor.call('deleteDataRecord', Session.get('currentDataRecord'));
      Router.go('/data');
    }
  },
  'click #editDataLink':function(){
    Router.go('/form/' + this.schema_id);
  },
  'click #approveDataLink':function(){
    Meteor.call('approveDataRecord', Session.get('currentDataRecord'));
    Router.go('/data'); // return to the list of completed forms after approving the form
  },
  'click #lockDataLink':function(){
    Meteor.call('lockDataRecord', Session.get('currentDataRecord'));
    Router.go('/data'); // return to the list of completed forms after locking the form
  },

  //-----------------------------------------
  // FORMS EVENTS

  'click #collectDataLink': function(){
    var record = Forms.findOne({_id: Session.get('currentForm')});
    var previousRecord = Session.get('currentDataRecord');

    var newDataRecord = {
      active: true,
      createdAt: new Date(),
      schema_id: this._id,
      formName: this.formName,
      subjectName: Session.get('selectedSubject').name,
      subjectId: Session.get('selectedSubject')._id,
      ownerUsername: Meteor.user().username,
      previousVersion : previousRecord,
      data: {}
    }
    for (var i = 0; i < record.schema.length; i++) {
      var block = record.schema[i];

      if(Session.get('item-' + block._id + '-yesno')){
        newDataRecord.data[block._id] = Session.get('item-' + block._id + '-yesno');
      }else if(Session.get('item-' + block._id + '-radio')){
        newDataRecord.data[block._id] = Session.get('item-' + block._id + '-radio');
      }else if(Session.get('item-' + block._id + '-multi')){
        newDataRecord.data[block._id] = Session.get('item-' + block._id + '-multi');
      }else{
        if($("#input-" + block._id).val()){
          newDataRecord.data[block._id] = $("#input-" + block._id).val();
        }else{
          newDataRecord.data[block._id] = "---";
        }
      }
    }
    Data.insert(newDataRecord, function(error, result){
      if(error){
        HipaaLogger.logEvent("error", Meteor.userId(), "Data", null, error, null, null);
      }
      if(result){
        HipaaLogger.logEvent("create", Meteor.userId(), "Data", result, null, Session.get('selectedSubject')._id, Session.get('selectedSubject').name);
      }
    });
    Router.go('/data');
  },
  'click #publishFormLink':function(){
    var self = this;
    if(self.stared){
      Forms.update({_id: self._id},{$set:{
        stared: false
      }},function(error, result){
        if(error){
          HipaaLogger.logEvent("error", Meteor.userId(), "Forms", null, error, null, null);
        }
        if(result){
          HipaaLogger.logEvent("publish", Meteor.userId(), "Forms", self._id, null, null, null);
        }
      });
    }else{
      Forms.update({_id: this._id},{$set:{
        stared: true
      }}, function(error, result){
        if(error){
          HipaaLogger.logEvent("error", Meteor.userId(), "Forms", null, error, null, null);
        }
        if(result){
          HipaaLogger.logEvent("unpublish", Meteor.userId(), "Forms", self._id, null, null, null);
        }
      });
    }
  },
  'click #editFormLink':function(){
    Router.go('/builder/' + this._id);
  },
  'click #deleteFormLink':function(){
    if(confirm('Are you sure you want to delete ' + this._id + "?")){
      Forms.remove({_id: this._id});
      Router.go('/');
    }
  }

});

// TODO: move to global helper object
saveForm = function(scope){
  var blockItems = Items.find({},{sort: {rank: 1}}).fetch();
  console.log("Saving  Schema: ", JSON.stringify(blockItems));
  console.log('_id', scope._id);


  var newForm = {
    createdAt: new Date(),
    stared: false,
    active: true,
    formName: $('#formTitleInput').val(),
    owner: Meteor.userId(),
    ownerUsername: Meteor.user().username,
    schema: blockItems,
    numBlocks: blockItems.length
  };
  if(Session.get('currentForm')){
    Forms.update({_id: Session.get('currentForm')},{$set:{
      formName: newForm.formName,
      owner: newForm.owner,
      ownerUsername: newForm.ownerUsername,
      schema: Items.find({},{sort: {rank: 1}}).fetch(),
      numBlocks: newForm.numBlocks
    }});
  }else{
    Forms.insert(newForm, function(error, result){
      if(error){
        HipaaLogger.logEvent("error", Meteor.userId(), "Forms", null, error, null, null);
      }
      if(result){
        HipaaLogger.logEvent("create", Meteor.userId(), "Forms", result, null, null, null);
      }
    });
  }
  Router.go('/forms');
}
