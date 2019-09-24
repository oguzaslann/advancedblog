
    function likesCheck(clicked_id){
      
    var ad = $(`#likeButton-${clicked_id}`).html();
    var asd = 65 + 1;
    alert(asd);

      if($.cookie(`buttonCookie-${clicked_id}`)){
        cancelLike(clicked_id); 
        } else {
        createLike(clicked_id);
      }
    }

    function createLike(clicked_id) {

      var likeFonk = {
          clicked_id:clicked_id
      }
      
      $.cookie(`buttonCookie-${clicked_id}`, `buttonCookie-${clicked_id}`, {expires : 365});
      $(`#likeButton-${clicked_id}`).css("color", "blue");    
      $.post("/createLike/:clicked_id", {likeFonk:likeFonk});
  }

  function cancelLike(clicked_id) {

    var likeFonk = {
        clicked_id:clicked_id
    }
    
    $.removeCookie(`buttonCookie-${clicked_id}`, `buttonCookie-${clicked_id}`, {expires : 365});

    $(`#likeButton-${clicked_id}`).css("color", "#777777");    
    
    $.post("/cancelLike/:clicked_id", {likeFonk:likeFonk});
}

  function buttonCookies(postId) {

    if($.cookie(`buttonCookie-${postId}`)){
      $(`#likeButton-${postId}`).css("color", "blue");  
      }
  }  

  function detailOpen(clicked_id) {
        
    $(`#detail-${clicked_id}`).removeClass("visibility-true");
    $(`#detailCloseButton-${clicked_id}`).removeClass("visibility-true");
    $(`#detailOpenButton-${clicked_id}`).addClass("visibility-true");

  }

  function detailClose(clicked_id) {
        
    $(`#detail-${clicked_id}`).addClass("visibility-true");
    $(`#detailCloseButton-${clicked_id}`).addClass("visibility-true");
    $(`#detailOpenButton-${clicked_id}`).removeClass("visibility-true");

  }

  function confirmPost (clicked_id) {

    var confirmFonk = {
      clicked_id:clicked_id
  }

    $.post("/validation/:clicked_id", {confirmFonk:confirmFonk});
  }

  function validation (e) {
    $("#vali").prop('checked', true);
  }

