Session.setDefault('formSearchFilter', '');
Session.setDefault('selectedFormId', null);
Session.setDefault('showFormSearch', false);


Template.formSearchModal.helpers({
  showFormSearch: function(){
    if(Session.get('showFormSearch')){
      Overlay.show();
      return "opacity: 1; display: visible;";
    } else {
      Overlay.hide();
      return "opacity: 0; display: none;";
    }
  },
  formList: function(){
    return Forms.find();
  },
  // getFormCount: function(){
  //   return Forms.find().count();
  // },
  getSearchTerm: function(){
    return Session.get('formSearchFilter');
  }
});



Template.formSearchModal.events({
  'click .list-group-item':function(){
    // Session.set('selectedForm', {
    //   _id: this._id,
    //   name: this.formName
    // });
    Session.set('selectedFormId', this._id);
  },
  'keyup #formSearchModalInput':function(){
    Session.set('formSearchFilter', $('#formSearchModalInput').val());
  },
  'click #modalOkButton': function(){
    Session.set('showFormSearch', false);
    Studies.update({_id: Session.get('selectedStudyId')}, {$addToSet:{
      forms: Session.get('selectedFormId')
    }});
  }
});
