Session.setDefault('formSearchFilter', '');
Session.setDefault('selectedFormId', null);


Template.formSearchModal.helpers({
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
  }
});
