Session.setDefault('selectedBlockItem', false);

Router.map(function(){
  this.route('builderPage', {
    path: '/builder/:id',
    template: 'builderPage',
    onBeforeAction: function(){
      Session.set('currentForm', this.params.id);
    },
    waitOn: function(){
      return Meteor.subscribe('forms');
    },
    data: function () {
      return Forms.findOne({_id: this.params.id});
    },
    onAfterAction:function(){
      showSidebars();
    }
  });
  this.route('builderPage', {
    path: '/builder',
    template: 'builderPage',
    onBeforeAction: function(){
      Session.set('currentForm', false);
    },
    waitOn: function(){
      return Meteor.subscribe('forms');
    },
    data: function () {
      return {};
    },
    onAfterAction:function(){
      showWestPanel();
    }
  });
});



Template.builderPage.events({
  'click .close':function(){
    Items.remove(this._id);
  },
  'click .item':function(){
    Session.set('selectedBuilderTab','editFieldTab');
    Session.set('selectedBlockItem', this._id);
    Session.set('multiSelectValues', {values: this.values});
    //console.log('selectedBuilderTab', Session.get('selectedBuilderTab'));

    if(this.block_type === "colorInputBlock"){
      Session.set('selectedBlockType', 'colorInputBlock');
    }else if(this.block_type === "numericInputBlock"){
      Session.set('selectedBlockType', 'numericInputBlock');
    }else if(this.block_type === "textareaInputBlock"){
      Session.set('selectedBlockType', 'textareaInputBlock');
    }else if(this.block_type === "textInputBlock"){
      Session.set('selectedBlockType', 'textInputBlock');
    }else if(this.block_type === "plainTextBlock"){
      Session.set('selectedBlockType', 'plainTextBlock');
    }else if(this.block_type === "spacerBlock"){
      Session.set('selectedBlockType', 'spacerBlock');
    }else if(this.block_type === "yesNoInputBlock"){
      Session.set('selectedBlockType', 'yesNoInputBlock');
    }else if(this.block_type === "radioInputBlock"){
      Session.set('selectedBlockType', 'radioInputBlock');
    }else if(this.block_type === "dateTimeInputBlock"){
      Session.set('selectedBlockType', 'dateTimeInputBlock');
    }else if(this.block_type === "timeInputBlock"){
      Session.set('selectedBlockType', 'timeInputBlock');
    }else if(this.block_type === "multiSelectInputBlock"){
      Session.set('selectedBlockType', 'multiSelectInputBlock');
    }
  },
  'click .yes-button':function(){
    Session.set('selectedBlockItem', this._id);
    alert('Form not activated yet.');
    // alert('yes: ' + this._id);
  },
  'click .no-button':function(){
    Session.set('selectedBlockItem', this._id);
    // alert('no: ' + this._id);
    alert('Form not activated yet.');
  }

});

Template.builderPage.helpers({
  // resized: function(){
  //   $('#builderPage').css('width', window.innerWidth - 275);
  //   return Session.get('resized');
  // },
  items: function(){
    return Items.find({}, { sort: { rank: 1 } });
  },
  formName: function(){
    var currentForm = Forms.findOne(Session.get('currentForm'));

    if(currentForm){
      console.log('currentForm', currentForm);
      return currentForm.formName;
    }else{
      return "";
    }
  },
  rendered: function () {
    $(this.find('#list')).sortable({ // uses the 'sortable' interaction from jquery ui
      stop: function (event, ui) { // fired when an item is dropped
        var el = ui.item.get(0);
        var before = ui.item.prev().get(0);
        var after = ui.item.next().get(0);

        var newRank;
        if (!before) { // moving to the top of the list
          newRank = SimpleRationalRanks.beforeFirst(UI.getElementData(after).rank);

        } else if (!after) { // moving to the bottom of the list
          newRank = SimpleRationalRanks.afterLast(UI.getElementData(before).rank);

        } else {
          newRank = SimpleRationalRanks.between(
            UI.getElementData(before).rank,
            UI.getElementData(after).rank);
        }
        Items.update(UI.getElementData(el)._id, {$set: {rank: newRank}});
      }
    });

    $('#sortableDropZone').droppable({
      accept: ".dragDropBlock",
      activeClass: 'visible',
      drop: function(){
        addBlockToForm();
        setTimeout(function(){
          Session.clear('movedElementId');
        }, 100);

      }
    });
  }
});


addBlockToForm = function(seed){
  Session.set('selectedBuilderTab','addNewFieldTab');

  var inputType = "text";
  var elementType = "input";
  var labelText = "";
  var text = "";
  var defaultValue = "Section ipsum...";

  if(seed){
    var defaultValue1 = seed.defaultValue1;
    var defaultValue2 = seed.defaultValue2;
    var defaultValue3 = seed.defaultValue3;
    var defaultValue4 = seed.defaultValue4;
    var defaultValue5 = seed.defaultValue5;
  }else{
    var defaultValue1 = "1";
    var defaultValue2 = "2";
    var defaultValue3 = "3";
    var defaultValue4 = "4";
    var defaultValue5 = "4";
  }

  if(Session.get('movedElementId') === "colorInputBlock"){
    inputType = "color";
    elementType = "color";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "numericInputBlock"){
    labelText = "Q: Lorem numberum...";
    inputType = "number";
    elementType = "input";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "textareaInputBlock"){
    labelText = "Q: Lorem textum...";
    elementType = "textarea";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "textInputBlock"){
    labelText = "Q: Lorem textae...";
    elementType = "input";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "sectionTitleBlock"){
    labelText = "Section ipsum...";
    elementType = "section";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "plainTextBlock"){
    labelText = "Lorem ipsum dolar sit amet...";
    elementType = "plaintext";
    defaultValue = "";
    inputValue = "";
  }else if(Session.get('movedElementId') === "spacerBlock"){
    inputType = "spacer";
    elementType = "spacer";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "yesNoInputBlock"){
    elementType = "yesno";
    inputType = "yesno";
    labelText = "Lorum yesno...";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "radioInputBlock"){
    elementType = "radio";
    inputType = "radio";
    labelText = "Lorum datum...";
    defaultValue = "";
    defaultValue1 = defaultValue1;
    defaultValue2 = defaultValue2;
    defaultValue3 = defaultValue3;
    defaultValue4 = defaultValue4;
    defaultValue5 = defaultValue5;
  }else if(Session.get('movedElementId') === "dateTimeInputBlock"){
    labelText = "Lorum datum...";
    inputType = "datetime";
    elementType = "datetime";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "timeInputBlock"){
    labelText = "Lorum datum...";
    inputType = "time";
    elementType = "time";
    defaultValue = "";
  }else if(Session.get('movedElementId') === "multiSelectInputBlock"){
    labelText = "Lorum datum...";
    inputType = "text";
    elementType = "multiselect";
    defaultValue = "";
  }

  var lastRank = 0;
  Items.find().forEach(function(doc){
    if(doc.rank > lastRank){
      lastRank = doc.rank + 1;
    }
  });

  var newObject = {
    block_type: Session.get('movedElementId'),
    rank: lastRank,
    inputType: inputType,
    inputValue: defaultValue,
    elementType: elementType,
    labelText: labelText,
    text: text,
    values: [],
    rank: Items.find().count() + 1
  };
  if(Session.get('movedElementId') === "radioInputBlock"){
    newObject.defaultValue1 = defaultValue1;
    newObject.defaultValue2 = defaultValue2;
    newObject.defaultValue3 = defaultValue3;
    newObject.defaultValue4 = defaultValue4;
    newObject.defaultValue5 = defaultValue5;
  }
  console.log('newObject', newObject);

  return Items.insert(newObject);
}
