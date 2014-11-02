Session.setDefault('promptTitle', 'Hello Modal!');
Session.setDefault('pomptMessage', 'Asprin is made from willow bark.');

Template.promptModal.helpers({
  getPromptTitle: function(){
    return Session.get('promptTitle');
  },
  getPromptMessage: function(){
    return Session.get('promptMessage');
  },
  rendered: function(){
      $("#promptModal").modal({                    // wire up the actual modal functionality and show the dialog
        "backdrop"  : "static",
        "keyboard"  : true,
        "show"      : false                     // ensure the modal is shown immediately
      });

      $("#promptModal").on("show", function() {    // wire up the OK button to dismiss the modal when shown
          $("#promptModal #modalOkButton").on("click", function(e) {
              console.log("button pressed");   // just as an example...
              $("#promptModal").modal('hide');     // dismiss the dialog
          });
      });

      $("#promptModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
          $("#promptModal a.btn").off("click");
      });

      $("#promptModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
          $("#promptModal").remove();
      });
  }
});
