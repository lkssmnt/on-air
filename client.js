var socket = io();

$(document).on('mousemove', function(){
  socket.emit('mouse move', {x: event.pageX, y: event.pageY});
});

socket.on('updateCursorPos', function(data){
  if($('.pointer[session_id="' + data.session_id + '"]').length <= 0){
    $('body').append('</div><img src="/assets/arrow.png" class="pointer" session_id="' +  data.session_id + '" alt="">')
  }

  var $pointer = $('.pointer[session_id="' + data.session_id + '"]');

  $pointer.css('left', data.coords.x);
  $pointer.css('top', data.coords.y);
});
