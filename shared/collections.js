Data =  new Meteor.Collection("TrialsData");
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

Forms =  new Meteor.Collection("TrialsForms");
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


Studies =  new Meteor.Collection("TrialsStudies");
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

Sponsors =  new Meteor.Collection("TrialsSponsors");
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

Subjects =  new Meteor.Collection("TrialsSubjects");
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

Comments =  new Meteor.Collection("TrialsComments");
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
Items = new Meteor.Collection("TrialsItems");
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
