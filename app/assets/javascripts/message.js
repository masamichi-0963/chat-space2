$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat__contents__content" data-message-id=${message.id}>
         <div class="chat__contents__content-top">
           <div class="chat__contents__content-top__user>
             ${message.user_name}
           </div>
           <div class="chat__contents__content-top__timestamp">
             ${message.date}
           </div>
         </div>
         <div class="chat__contents__content__text">
           <p class="chat__contents__content__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat__contents_content" data-message-id=${message.id}>
         <div class="chat__contents_content-top">
           <div class="chat__contents__content-top__user">
             ${message.user_name}
           </div>
           <div class="chat__contents__content-top__timestamp">
             ${message.date}
           </div>
         </div>
         <div class="chat__contents__content__text">
           <p class="chat__contents__content__text">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat__contents').append(html);
    $('.chat__contents').animate({scrollTop: $('.chat__contents')[0].scrollHeight}, 'fast');   
    $('#new_message')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });
});