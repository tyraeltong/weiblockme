function loadBlackList(){
  return localStorage["blackList"] ? localStorage["blackList"].split(',') : [];
}

function addAndSaveBlackList(textToBlock){
  blackListStore.push(textToBlock);
  localStorage["blackList"] = blackListStore.join(',');
}

var blackListStore = loadBlackList();

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse){
    if(request.op == 'addToBlackList') {
      alert('get addToBlackList request!');
      blackListStore.push(request.content);
      localStorage["blackList"] = blackListStore.join(',');
    } else if(request.op == 'getBlackList'){
      sendResponse({blackList: blackListStore});
    } else if(request.op == 'reloadBlackList'){
      blackListStore = loadBlackList();
    }
  }
);