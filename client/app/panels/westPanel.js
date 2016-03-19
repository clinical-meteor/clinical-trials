var seed = new Meteor.Collection.ObjectID();

Session.setDefault('selectedBuilderTab','addNewFieldTab');
Session.setDefault('seed', new Meteor.Collection.ObjectID());
Session.setDefault('multiSelectValues', {values:[{_id: seed._str, value: 'foo'}]});

Template.westPanel.events({
  'keyup .multiselectInput':function(event){
    // get the values from our sidebar
    var array = Session.get('multiSelectValues');

    // update our array
    for(var i = 0; i < array.values.length; i++) {
      if(event.currentTarget.id.indexOf(array.values[i]._id) > -1){
        array.values[i].value = $("#" + event.currentTarget.id).val();
      }
    }

    // update our sidebar with the new array
    Session.set('multiSelectValues', array);

    // update the selected block item with the new array
    Items.update({_id: Session.get('selectedBlockItem')}, {$set:{
      values: array.values
    }});

  },
  'click .multiselectRemove':function(){
    var array = Session.get('multiSelectValues');
    //var index = array.values.indexOf(this);
    var index = false;

    for(var i = 0; i < array.values.length; i++) {
      //var object = array.values[i];
      if(array.values[i]._id === this._id){
        index = i;
      }
    }

    console.log('this ', this);
    console.log('index ', index);
    array.values.splice(index, 1);
    Session.set('multiSelectValues', array);

    Items.update({_id: Session.get('selectedBlockItem')}, {$set:{
      values: array.values
    }});
  },
  'click #addSelectItemButton':function(){
    var array = Session.get('multiSelectValues');
    if(array === undefined){
      array = [];
    }
    var object = new Meteor.Collection.ObjectID();
    console.log('adding select item', object._str);
    array.values.push({_id: object._str, value: ''});
    console.log('array', array);

    Session.set('multiSelectValues', array);
    Items.update({_id: Session.get('selectedBlockItem')}, {$set:{
      values: array.values
    }});
  },
  'click #deleteBlockButton':function(){
    Items.remove(Session.get('selectedBlockItem'));
    Session.set('selectedBuilderTab','addNewFieldTab');
    Session.set('selectedBlockItem', false);
  },
  'click #saveFormBlockParamsButton':function(){
    var newObject = {
        labelText: $('#questionInput').val(),
        inputValue: $('#defaultValueInput').val(),
    };
    if(Session.get('selectedBlockType') === 'radioInputBlock'){
        newObject.defaultValue1 = $('#defaultValueInput1').val();
        newObject.defaultValue2 = $('#defaultValueInput2').val();
        newObject.defaultValue3 = $('#defaultValueInput3').val();
        newObject.defaultValue4 = $('#defaultValueInput4').val();
        newObject.defaultValue5 = $('#defaultValueInput5').val();
    }
    Items.update({_id: Session.get('selectedBlockItem') }, {$set: newObject});
  },
  'click #duplicateFormBlockButton':function(){
    Session.set('selectedBlockType', this.block_type);
    Session.set('movedElementId', this.block_type);
    Session.set('selectedBlockItem', addBlockToForm(this));
    Session.set('selectedBuilderTab','editFieldTab');
  },

  'click #plainTextBlock':function(){
    // Session.set('selectedBlockType', 'plainTextBlock');
    // Session.set('movedElementId', 'plainTextBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('plainTextBlock');
  },
  'click #textInputBlock':function(){
    // Session.set('selectedBlockType', 'textInputBlock');
    // Session.set('movedElementId', 'textInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('textInputBlock');
  },
  'click #textareaInputBlock':function(){
    // Session.set('selectedBlockType', 'textareaInputBlock');
    // Session.set('movedElementId', 'textareaInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('textareaInputBlock');
  },
  'click #numericInputBlock':function(){
    // Session.set('selectedBlockType', 'numericInputBlock');
    // Session.set('movedElementId', 'numericInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('numericInputBlock');
  },
  'click #spacerBlock':function(){
    // Session.set('selectedBlockType', 'spacerBlock');
    // Session.set('movedElementId', 'spacerBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('spacerBlock');
  },
  'click #sectionTitleBlock':function(){
    // Session.set('selectedBlockType', 'sectionTitleBlock');
    // Session.set('movedElementId', 'sectionTitleBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('sectionTitleBlock');
  },
  'click #yesNoInputBlock':function(){
    // Session.set('selectedBlockType', 'yesNoInputBlock');
    // Session.set('movedElementId', 'yesNoInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('yesNoInputBlock');
  },
  'click #dateTimeInputBlock':function(){
    // Session.set('selectedBlockType', 'dateTimeInputBlock');
    // Session.set('movedElementId', 'dateTimeInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('dateTimeInputBlock');
  },
  'click #timeInputBlock':function(){
    // Session.set('selectedBlockType', 'timeInputBlock');
    // Session.set('movedElementId', 'timeInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('timeInputBlock');
  },
  'click #radioInputBlock':function(){
    // Session.set('selectedBlockType', 'radioInputBlock');
    // Session.set('movedElementId', 'radioInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('radioInputBlock');
  },
  'click #multiSelectInputBlock':function(){
    // Session.set('selectedBlockType', 'multiSelectInputBlock');
    // Session.set('movedElementId', 'multiSelectInputBlock');
    // Session.set('selectedBlockItem', addBlockToForm());
    // Session.set('selectedBuilderTab','editFieldTab');

    initiateAddingBlock('multiSelectInputBlock');

    var pseudoObject = new Meteor.Collection.ObjectID();
    Session.set('multiSelectValues', {values:[{_id: pseudoObject._str, value: 'foo'}]});
  },
  'click #addNewFieldTab':function(){
    Session.set('selectedBuilderTab','addNewFieldTab');
    console.log(Session.get('selectedBuilderTab'));
  },
  'click #editFieldTab':function(){
    if(Session.get('selectedBlockItem')){
      Session.set('selectedBuilderTab','editFieldTab');
      console.log(Session.get('selectedBuilderTab'));
    }
  }
});


Template.westPanel.helpers({
  getMultiSelectValue: function(){
    return this.value;
  },
  getMultiSelectId:function(){
    return this._id;
  },
  selectItems: function(){
    var record = Items.findOne({_id: Session.get('selectedBlockItem')});
    if(record && record.values){
      return record.values;
    }else{
      return [];
    }
  },
  selectedFormBlock: function(){
    return Items.findOne(Session.get('selectedBlockItem'));
  },
  getQuestionText:function(){
    return this.labelText;
  },
  getDefaultValue: function(){
    return this.inputValue;
  },


  getValue1: function(){
    return this.defaultValue1;
  },
  getValue2: function(){
    return this.defaultValue2;
  },
  getValue3: function(){
    return this.defaultValue3;
  },
  getValue4: function(){
    return this.defaultValue4;
  },
  getValue5: function(){
    return this.defaultValue5;
  },


  addNewFieldTabActive: function(){
    if(Session.equals('selectedBuilderTab', 'addNewFieldTab')){
      return "active";
    }else{
      return "";
    }
  },
  editFieldTabActive: function(){
    if(Session.equals('selectedBuilderTab', 'editFieldTab')){
      return "active";
    }else{
      return "";
    }
  },
  isAddNewFieldTab: function(){
    if(Session.get('selectedBuilderTab') === 'addNewFieldTab'){
      return true;
    }else{
      return false;
    }
  },
  hasDefaultValue: function(){
    if(Session.get('selectedBlockType') === 'plainTextBlock'){
      return false;
    }else if(Session.get('selectedBlockType') === 'radioInputBlock'){
      return false;
    }else if(Session.get('selectedBlockType') === 'multiSelectInputBlock'){
      return false;
    }else if(Session.get('selectedBlockType') === 'sectionTitleBlock'){
      return false;
    }else if(Session.get('selectedBlockType') === 'spacerBlock'){
      return false;
    }else{
      return true;
    }
  },
  hasRadioValues: function(){
    if(Session.get('selectedBlockType') === 'plainTextBlock'){
        return false;
    }else if(Session.get('selectedBlockType') === 'radioInputBlock'){
        return true;
    }else{
      return false;
    }
  },
  hasMultipleValues: function(){
    if(Session.get('selectedBlockType') === 'plainTextBlock'){
        return false;
    }else if(Session.get('selectedBlockType') === 'multiSelectInputBlock'){
        return true;
    }else{
      return false;
    }
  }
});



//=============================================

initiateAddingBlock = function(blockType){
  Session.set('selectedBlockType', blockType);
  Session.set('movedElementId', blockType);
  Session.set('selectedBlockItem', addBlockToForm());
  Session.set('selectedBuilderTab','editFieldTab');
}
