Package.describe({
  summary: "Modal dialogs for ClinicalFramework based apps",
  version: "0.1.0",
  name: "clinical:ui-modals",
  git: "http://github.com/awatson1978/clinical-ui-modals.git"
});



Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.use('mrt:bootstrap-3');
  api.use('templating');
  api.use('session');

  api.addFiles('modals/confirm.html', "client");
  api.addFiles('modals/confirm.js', "client");
  api.addFiles('modals/confirm.less', "client");

  api.addFiles('modals/keybindings.html', "client");
  api.addFiles('modals/keybindings.js', "client");
  api.addFiles('modals/keybindings.less', "client");

  api.addFiles('modals/prompt.html', "client");
  api.addFiles('modals/prompt.js', "client");
  api.addFiles('modals/prompt.less', "client");

  api.addFiles('modals/removeUser.html', "client");
  api.addFiles('modals/removeUser.js', "client");
  api.addFiles('modals/removeUser.less', "client");

  api.addFiles('modals/selectRole.html', "client");
  api.addFiles('modals/selectRole.js', "client");
  api.addFiles('modals/selectRole.less', "client");
});



Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('clinical-ui-modals-tests.js');
});
