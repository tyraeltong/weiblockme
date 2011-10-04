$(function(){
  var blackList = [];

  function removeWeiboByKeywords(elem){
    for(var i = 0; i < blackList.length; i++){
      if($(elem).closest('li').first().text().indexOf(blackList[i]) >= 0) {
        $(elem).closest('li').hide('fast', function(){
          $(this).remove();
        });
      }
    }
  }

  chrome.extension.sendRequest({op: 'getBlackList'}, function(response){
    blackList = response.blackList;
    console.log(response.blackList);
    
    $('.MIB_mbloglist .MIB_feed li .MIB_feed_c .rt').each(function(idx, elem){
       removeWeiboByKeywords(elem);
    });

    $('.MIB_mbloglist').bind('DOMNodeInserted', function(event){
      if($(event.target).hasClass('MIB_feed')){
        console.log(event.target);
        $(event.target).find('.MIB_feed_c .rt').each(function(idx, elem){
          removeWeiboByKeywords(elem);   
        });
      }
    });
  });
});