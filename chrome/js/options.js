function stopEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
}

function tellBackgroundPageToReload(){
  chrome.extension.sendRequest({op: 'reloadBlackList'});
}

function addTag(tagText){
  var newTagItem = $('#newTagItemTemplate').clone();
  newTagItem.find('em').text(tagText);
  $('#tags').append(newTagItem);
}

function restore_options(){
  var blackList = localStorage["blackList"];
  if (!blackList){
    return;
  }

  tagArray = blackList.split(",");

  for(var i = 0; i < tagArray.length; ++i){
    addTag(tagArray[i]);
  }
}

function removeTag(tag){
  $(tag).closest('li').hide('fast', function(){
    $(this).remove();
    saveOptions();
  });
}

function saveOptions(){
  var tagArray = new Array;
  $('#tags').find('em').each(function(idx, elem){
    tagArray.push($(elem).text());
  })

  localStorage["blackList"] = tagArray.join(',');
  tellBackgroundPageToReload();
}

function addNewTag(){
  addTag($('#newTag').val());
  $('#newTag').val('');
  $('#newTag').focus();
  saveOptions();
}