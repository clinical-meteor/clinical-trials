Data =  new Meteor.Collection("data");
Data.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});

Forms =  new Meteor.Collection("forms");
Forms.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});


Studies =  new Meteor.Collection("studies");
Studies.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});

Sponsors =  new Meteor.Collection("sponsors");
Sponsors.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});

Subjects =  new Meteor.Collection("subjects");
Subjects.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});

Comments =  new Meteor.Collection("comments");
Comments.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});


// TODO:  refactor Items to FormItems
Items = new Meteor.Collection("items");
Items.allow({
  update: function(){
    return true;
  },
  insert: function(){
    return true;
  },
  remove: function(){
    return true;
  }
})




if (Meteor.isServer) {
  if (Items.find().count() === 0) {
    _.each(
      ["penecillin", "vitamin d", "tetracycline", "epinephrine", "peptol bismol", "claritin", "dihydrogen monoxide", "asprin"],
      function (text, index) {
        Items.insert({
          text: text,
          rank: index,
          labelText: text,
          inputValue: "",
          inputType: "text",
          inputPlaceholder: "...",
          elementType: 'input'
        });
      });
  }
  if(Sponsors.find().count() === 0){
    Sponsors.insert({
      name: "ACME Pharmaceuticals",
      createdAt: new Date()
    });
    Sponsors.insert({
      name: "Big Pharma, Inc",
      createdAt: new Date()
    });
  }
}
