
//---------------------------------------------------------
// RECORD ACTIVE PATTERN

UI.registerHelper('getStatusLabelText',function(){
  if(this.active || (this.profile && this.profile.active)){
    return "active";
  }else{
    return "Inactive";
  }
});
UI.registerHelper('getStatusLabelColor',function(){
  if(this.active || (this.profile && this.profile.active)){
    return "label-success";
  }else{
    return "label-default";
  }
});

UI.registerHelper('isAdmin', function() {
  // this is a small security hole that a user can exploit
  // by setting their role to something else
  // TODO:  set user role permissions on data publications so it doesnt matter if they spoof it or not

  if(Meteor.user()){
    if(Meteor.user().profile && Meteor.user().profile.roles){
      // these comparisons should be soft comparisons with == rather than ===
      // because we're comparing strings to array values, and there is a cast involved
      if((Meteor.user().profile.roles[0] == "Admin") || (Meteor.user().profile.roles[0] == "SysAdmin")){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }else{
    return null;
  }
});

UI.registerHelper('isRole', function(role) {
  if(Meteor.user()){
    var profileRole = Meteor.user().profile.role;

    if(profileRole){
      if(profileRole.indexOf(role) > -1){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }else{
    return false;
  }
});
UI.registerHelper('getCreatedAt', function(){
  return moment(this.createdAt).format("YYYY-MM-DD hh:mm a");
});

UI.registerHelper('isLoggedIn', function() {
  if(Meteor.userId()){
    return true;
  }else{
    return false;
  }
});

UI.registerHelper('getApprovalIcon', function(){
  if(this.approved){
    return 'fa-check';
  }else{
    return 'fa-inbox';
  }
});

UI.registerHelper('getDeleteIcon', function(){
  if ( !this.deleted ) {
    return 'fa-trash-o';
  }
});

UI.registerHelper('getLockedIcon', function(){
  if(this.locked){
    return 'fa-lock';
  }else{
    return 'fa-unlock';
  }
});

//===================================================

UI.registerHelper('isTextBlock', function(){
  if(['text', 'plaintext'].includes(this.elementType)){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isRadioBlock', function(){
  if(this.elementType === "radio"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isInput',function(){
  if(this.elementType === "input"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isTextarea', function(){
  if(this.elementType === "textarea"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isSpacer', function(){
  if(this.elementType === "spacer"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isYesNoBlock', function(){
  if(this.elementType === "yesno"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isSectionTitle', function(){
  if(this.elementType === "section"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isDateTimeBlock', function(){
  if(this.elementType === "datetime"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isTimeBlock', function(){
  if(this.elementType === "time"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isSectionTitle', function(){
  if(this.elementType === "section"){
    return true;
  }else{
    return false;
  }
});
UI.registerHelper('isMultiSelectBlock', function(){
  if(this.elementType === "multiselect"){
    return true;
  }else{
    return false;
  }
});


UI.registerHelper('getSelectedActive', function(){
  if(Session.get('item-' + this.question_id + '-multi')){
    if(Session.get('item-' + this.question_id + '-multi') == this.value){
      return "btn-info";
    }else{
      return "btn-default";
    }
  }else{
    return "btn-default";
  }
});

UI.registerHelper('getSelectItemValue', function(){
  return this.value;
});
UI.registerHelper('getMultiSelectId', function(){
  return this._id;
});
UI.registerHelper('selectItems', function(){
  var self = this;
  if(this.values){
    console.log('this.values', this.values);
    var array = [];
    this.values.forEach(function(object){
      object.question_id = self._id;
      array.push(object);
    });
    return array;
  }
});
