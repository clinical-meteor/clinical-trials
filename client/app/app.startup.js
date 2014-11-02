Session.setDefault('resize', null);

Meteor.startup(function(){
  $(window).resize(function(evt) {
    Session.set("resize", new Date());
  });

  bowser = BrowserObserver.init();
});
