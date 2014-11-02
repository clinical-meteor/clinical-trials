Meteor.startup(function(){
  Mousetrap.bind('shift+e', function() {
    $('#errorPanel').sidebar('toggle');
  });
  // Mousetrap.bind('shift+m', function() {
  //   $('#westPanel').sidebar('toggle');
  // });
  Mousetrap.bind('shift+p', function() {
    $('#promptModal').modal("show");
  });
  Mousetrap.bind('shift+c', function() {
    $('#confirmModal').modal("show");
  });
  Mousetrap.bind('shift+k', function() {
    $('#keybindingsModal').modal("show");
  });
});
