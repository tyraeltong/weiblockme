function weiBlockMeClickHandler(info, tab) {
  var textToBlock = info['selectionText'];
  addAndSaveBlackList(textToBlock);
}

chrome.contextMenus.create({
  'title': 'Block Weibo with keyword: \'%s\'',
  'contexts': ['selection'],
  'onclick': weiBlockMeClickHandler
});
