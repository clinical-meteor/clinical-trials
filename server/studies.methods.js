Meteor.methods({
  removeVisitFromStudy: function(payload){
    console.log(payload);
    return Studies.update({_id: payload.studyId}, {$pull:{
      visits: payload.label
    }});
  }
})
