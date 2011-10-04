$(function(){
  var textToBlock = "";

  if(!window.Kolich){
    Kolich = {};
  }

  Kolich.Selector = {};
  Kolich.Selector.getSelected = function(){
    var t = '';
    if(window.getSelection){
      t = window.getSelection().toString();
    }else if(document.getSelection){
      t = document.getSelection().toString();
    }
    return t;
  }

  Kolich.Selector.mouseup = function(){
    textToBlock = Kolich.Selector.getSelected();
  }

  $(document).bind("mouseup", Kolich.Selector.mouseup);

  chrome.extension.sendRequest({op: 'getBlackList'}, function(response){
    var blackList = response.blackList;
    console.log(response.blackList);
    
    $('.MIB_mbloglist .MIB_feed li .MIB_feed_c .rt').livequery(function(){
      var removed = false;

      for(var i = 0; i < blackList.length; i++){
        if ($(this).closest('li').first().text().indexOf(blackList[i]) >= 0) {
          $(this).closest('li').hide('slow', function(){
            $(this).remove();
            removed = true;
          });
        }
      }

      if(!removed){
        $("<a href='javascript:void(0);'><strong lang='CD0023'>屏蔽</strong></a><span class='MIB_line_l'>|</span>").click(function(){
            $(this).closest('li').hide('slow', function(){
              if(textToBlock != ""){
                chrome.extension.sendRequest({op: 'addToBlackList', content: textToBlock});
              }
              
              $(this).remove();
          });
        }).prependTo($(this));
      } 
    });

    $('#pully_list').remove();
  });
});