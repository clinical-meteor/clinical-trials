Session.setDefault('movedElementId', null);
Session.setDefault('mouseMoveElementId', 'Hello Dropzones!');
Session.setDefault('mouseMoveX', 0);
Session.setDefault('mouseMoveY', 0);

Template.appLayout.rendered = function(){
  $(document).mousemove(function (e) {
     Session.set('movedElementId', e.target.id);
     Session.set('mouseMoveX', e.clientX);
     Session.set('mouseMoveY', e.clientY);
     //Session.set('mouseMoveElementId', document.elementFromPoint(e.clientX,e.clientY));
  });

  $('.dragDropBlock').draggable({
    revert: true,
    revertDuration: 5,
    stop: function(event, ui){
      //console.log(document.querySelectorAll( ":hover" ));
      console.log(document.elementFromPoint(Session.get('mouseMoveX'),Session.get('mouseMoveY')).id)
    }
    //grid: [ 10, 10 ],
    //opacity: 0.35
  });
};
