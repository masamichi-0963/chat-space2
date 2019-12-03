$(function(){ 
  function buildHTML(message){
   if ( message.image ) {

     var html =
      `<div class="chat__contents__content" data-message-id=${message.id}>
         <div class="chat__contents__content-top">
           <div class="chat__contents__content-top__user">
             ${message.user_name}
           </div>
           <div class="chat__contents__content-top__timestamp">
             ${message.created_at}
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
      `<div class="chat__contents__content" data-message-id=${message.id}>
         <div class="chat__contents__content-top">
           <div class="chat__contents__content-top__user">
             ${message.user_name}
           </div>
           <div class="chat__contents__content-top__timestamp">
             ${message.created_at}
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


var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  var last_message_id = $('.chat__contents__content:last').data("message-id");
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: 'api/messages',
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {last_id: last_message_id}
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function (message) {
      insertHTML = buildHTML(message);
      $('.chat__contents').append(insertHTML);
      $('.chat__contents').animate({scrollTop: $('.chat__contents')[0].scrollHeight}, 'fast');       });
  })
  .fail(function() {
    alert('自動更新に失敗しました');
  });
  return false;
}
};
setInterval(reloadMessages, 7000);
});