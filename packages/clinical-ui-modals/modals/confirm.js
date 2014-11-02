Template.confirmModal.events({
  'click #modalSaveButton':function(){
    Session.set('inPageAlertType', 'success');
    Session.set('inPageAlertText', 'success');
  }
});
