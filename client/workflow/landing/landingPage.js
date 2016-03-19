Template.landingPage.getUserCount = function(){
  var count = Meteor.users.find().count();
  return count;
};

Template.landingPage.events({
  'click #screenshotTileBlue, tap #screenshotTileBlue':function(){

    Session.set('overlay_image_path', $('#screenshotBlue').attr('src'));
    Session.set('show_reactive_overlay', true);
    Session.set('show_overlay_image', true);

  }
});

Session.setDefault('screenshotIndex', 0);
Meteor.startup(function () {
  var displayedScreenshotIndex = 0;
  Meteor.setInterval(function () {
    if(displayedScreenshotIndex === 1){
      displayedScreenshotIndex = 0;
    }else{
      displayedScreenshotIndex = displayedScreenshotIndex + 1;
    }
    Session.set('screenshotIndex', displayedScreenshotIndex);
  }, 3000);
});

// Template.landingPage.getScreenshotPath = function(){
//   switch(Session.get('screenshotIndex')){
//     case 0:
//       return "/Dermatomes_Female_Double_Medium.png";
//       break;
//     case 1:
//       return "/Dermatomes_Male_Double_Medium.png";
//       break;
//     case 2:
//       return "/Dermatomes_Female_Double_Medium.png";
//       break;
//   }
// };
// 
// Template.landingPage.firstImageTransition = function(){
//   if(Session.get('screenshotIndex') === 0){
//     return 'in';
//   }else{
//     return 'out';
//   }
// }
// Template.landingPage.secondImageTransition = function(){
//   if(Session.get('screenshotIndex') === 1){
//     return 'in';
//   }else{
//     return 'out';
//   }
// }
