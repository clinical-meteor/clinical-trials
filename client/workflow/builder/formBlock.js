



Template.formBlock.helpers({
  isSelected: function(){
    if(Session.get('selectedBlockItem') === this._id){
      return "selected"
    }
  },
  isInput: function(){
    if(this.elementType === "input"){
      return true;
    }else{
      return false;
    }
  },
  getLabelText: function(){
    var resultString = "";
    if(this.labelText){
        return resultString + this.labelText;
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

  getValue1: function(){
    if(this.defaultValue1){
      return this.defaultValue1;
    }else{
      return "1";
    }
  },
  getValue2: function(){
    if(this.defaultValue2){
      return this.defaultValue2;
    }else{
      return "2";
    }
  },
  getValue3: function(){
    if(this.defaultValue3){
      return this.defaultValue3;
    }else{
      return "3";
    }
  },
  getValue4: function(){
    if(this.defaultValue4){
      return this.defaultValue4;
    }else{
      return "4";
    }
  },
  getValue5: function(){
    if(this.defaultValue5){
      return this.defaultValue5;
    }else{
      return "5";
    }
  }

});
