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

var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = 'chat__contents__content'
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: location.href,
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    console.log('success');
  })
  .fail(function() {
    console.log('error');
  });
  setInterval(reloadMessages, 7000);
};

