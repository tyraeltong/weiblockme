$(function(){
  var textToBlock = "";
  var blackList = [];

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

  function removeOrAddBlockLink(elem){
    var removed = false;

    for(var i = 0; i < blackList.length; i++){
      if ($(elem).closest('li').first().text().indexOf(blackList[i]) >= 0) {
        $(elem).closest('li').hide('slow', function(){
          $(this).remove();
          removed = true;
        });
      }
    }

    if(!removed){
      $("<a href='javascript:void(0);'><strong>屏蔽</strong></a><span class='MIB_line_l'>|</span>").click(function(){
          $(elem).closest('li').hide('slow', function(){
            if(textToBlock != ""){
              chrome.extension.sendRequest({op: 'addToBlackList', content: textToBlock});
            }
            
            $(this).remove();
        });
      }).prependTo($(elem));
    }
  }

  chrome.extension.sendRequest({op: 'getBlackList'}, function(response){
    blackList = response.blackList;
    console.log(response.blackList);
    
    $('.MIB_mbloglist .MIB_feed li .MIB_feed_c .rt').each(function(idx, elem){
       removeOrAddBlockLink(elem);
    });

    $('.MIB_mbloglist').bind('DOMNodeInserted', function(event){
      if($(event.target).hasClass('MIB_feed')){
        console.log(event.target);
        $(event.target).find('.MIB_feed_c .rt').each(function(idx, elem){
          removeOrAddBlockLink(elem);   
        });
      }
    });

    $('#pully_list').remove();
  });
});