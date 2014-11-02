Session.setDefault('visibleForm', false);

Router.map(function(){
  this.route('studyOverviewPage', {
    path: '/study/home/:id',
    template: 'studyOverviewPage',
    onBeforeAction: function(){
      Session.set('currentForm', this.params.id);
    },
    data: function () {
      console.log('routing to: ', this.params.id);
      return Studies.findOne({_id: this.params.id});
    },
  });
});
Template.studyOverviewPage.events({
  'click .studyVisit':function(){
    Session.set('selectedVisit', this);
  },
  'click .studySubject':function(){
    Session.set('selectedSubject', this);
  },
  'click .tab':function(){
    Session.set('visibleForm', this._id);
  },
  'click .individualFormRow':function(event){
    Router.go('/form/' + this._id);
    event.preventDefault();
  },
  'click #editStudyButton':function(){
    Router.go('/edit/study/' + this._id);
  },
  'click #studyDeleteButton':function(){
    if(confirm('Are you sure you want to delete ' + this._id + "?")){
      Studies.remove({_id: this._id});
      Router.go('/');
    }
  },
  'click #studyPublishButton':function(){
    if(this.stared){
      Studies.update({_id: this._id},{$set:{
        stared: false
      }});
    }else{
      Studies.update({_id: this._id},{$set:{
        stared: true
      }});
    }
  }
  // 'click #studyCollectButton':function(){
  //   console.log('collecting data...');
  //
  //   var record = Studies.findOne({_id: Session.get('currentForm')});
  //   console.log('currentForm', record);
  //
  //   var newDataRecord = {
  //     createdAt: new Date(),
  //     schema_id: this._id,
  //     studyName: this.studyName,
  //     data: {}
  //   }
  //   record.schema.forEach(function(block){
  //     if(Session.get('item-' + block._id + '-yesno')){
  //       newDataRecord.data[block._id] = Session.get('item-' + block._id + '-yesno');
  //     }else{
  //       newDataRecord.data[block._id] = $("#input-" + block._id).val();
  //     }
  //   });
  //   Data.insert(newDataRecord);
  // }
});

Template.studyOverviewPage.helpers({
  getVisitLabel: function(){
    return this;
  },
  visitsList: function(){
    return this.visits;
  },
  resultsList: function(){
    return Subjects.find();
  },
  visitHasBeenChosen: function(){
    if(Session.get('selectedVisit')){
      return true;
    }else{
      return false;
    }
  },
  userHasBeenSelected: function(){
    if(Session.get('selectedSubject')){
      return true;
    }else{
      return false;
    }
  },
  formSchema: function(){
    var form = Forms.findOne(Session.get('visibleForm'));
    if(form){
      return form.schema;
    }else{
      return [];
    }
  },
  getFormId: function(){
    return Session.get('visibleForm');
  },
  formsList: function(){
    var study = Studies.findOne({_id: this._id});
    if(study){
      Session.set('visibleForm', study.forms[0]);
      return Forms.find({ _id: {$in: study.forms }});
    }else{
      return [];
    }
  },
  studySchema: function(){
    console.log('study.schema', this.schema);
    var study = Studies.findOne(Session.get('currentForm'));
    if(study){
      return study.schema;
    }else{
      return [];
    }
  },
  getStar:function(){
    if(this.stared){
      return 'fa-star';
    }else{
      return 'fa-star-o';
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
  }
});
