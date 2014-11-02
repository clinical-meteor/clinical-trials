
Template.entryAccountButtons.helpers({
  profileUrl: function() {
    if (AccountsEntry.settings.profileRoute) {
      return AccountsEntry.settings.profileRoute;
    }else{
      return false;
    }
  },
  wrapLinks: function() {
    return AccountsEntry.settings.wrapLinks;
  }
});
