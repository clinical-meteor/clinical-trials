Session.setDefault('subjectSearchFilter', '');
Session.setDefault('selectedSubject', null);

Template.subjectSearchModal.subjectList = function(){
  return Subjects.find({name: {
    $regex: Session.get('subjectSearchFilter'),
    $options: 'i',
    $ne: 'Default Subject'
  }});
};


Template.subjectSearchModal.getSearchTerm = function(){
  return Session.get('subjectSearchFilter');
};
Template.subjectSearchModal.events({
  'click .list-group-item':function(){
    Session.set('selectedSubject', {
      _id: this._id,
      name: this.name
    });
  },
  'keyup #subjectSearchModalInput':function(){
    Session.set('subjectSearchFilter', $('#subjectSearchModalInput').val());
  }
});
