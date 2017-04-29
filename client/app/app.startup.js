Session.setDefault('resize', null);

Meteor.startup(function(){
  Session.set("glassOpacity", 1);

  $(window).resize(function(evt) {
    Session.set("resize", new Date());
  });

  bowser = BrowserObserver.init();
});
