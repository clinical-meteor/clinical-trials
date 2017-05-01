// this page is for capturing data, so we any data that is returned is what is stored in the current Session
// this page is very similar to dataBlockPreivew.js, and could maybe be merged
// but we want to be careful about the pattern



Template.formBlockPreview.helpers({
  getLabelText: function(){
    var resultString = "";
    if(this.schemaTemplate && this.schemaTemplate.label){
        return resultString + this.schemaTemplate.label;
    }else{
        return resultString;
    }
  },
  getInputType: function(){
    return this.inputType;
  },
  getInputPlaceholder: function(){
    if(this.inputPlaceholder){
      return this.inputPlaceholder;
    }else{
      return "...";
    }
  },
  getInputValue: function(){
    return this.inputValue;
  },
  getJson: function(){
    return JSON.stringify(this);
  },
  yesNoBlockYesValue: function(){
    if(Session.get('item-' + this._id + '-yesno')){
      if(Session.get('item-' + this._id + '-yesno') == 'yes'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  },
  yesNoBlockNoValue: function(){
    if(Session.get('item-' + this._id + '-yesno')){
      if(Session.get('item-' + this._id + '-yesno') == 'no'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  },

  getValueActive1: function(){
    if(Session.get('item-' + this._id + '-radio')){
      if(Session.get('item-' + this._id + '-radio') == '1'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  },
  getValueActive2: function(){
    if(Session.get('item-' + this._id + '-radio')){
      if(Session.get('item-' + this._id + '-radio') == '2'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  },
  getValueActive3: function(){
    if(Session.get('item-' + this._id + '-radio')){
      if(Session.get('item-' + this._id + '-radio') == '3'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }

  },
  getValueActive4: function(){
    if(Session.get('item-' + this._id + '-radio')){
      if(Session.get('item-' + this._id + '-radio') == '4'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  },
  getValueActive5: function(){
    if(Session.get('item-' + this._id + '-radio')){
      if(Session.get('item-' + this._id + '-radio') == '5'){
        return "btn-info";
      }else{
        return "btn-default";
      }
    }else{
      return "btn-default";
    }
  }
});



Template.formBlockPreview.events({
  'click .multiselect-button':function(){
    Session.set('item-' + this.question_id + '-multi', this.value);
  },
  'click .yes-button':function(){
    Session.set('item-' + this._id + '-yesno', 'yes');
  },
  'click .no-button':function(){
    Session.set('item-' + this._id + '-yesno', 'no');
  },

  'click .radio-1-button':function(){
    Session.set('item-' + this._id + '-radio', '1');
  },
  'click .radio-2-button':function(){
    Session.set('item-' + this._id + '-radio', '2');
  },
  'click .radio-3-button':function(){
    Session.set('item-' + this._id + '-radio', '3');
  },
  'click .radio-4-button':function(){
    Session.set('item-' + this._id + '-radio', '4');
  },
  'click .radio-5-button':function(){
    Session.set('item-' + this._id + '-radio', '5');
  }

});
