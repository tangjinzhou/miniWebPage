chrome.browserAction.onClicked.addListener(function(tab) {

    var tabUrl = tab.url;
    var cssCode = '';
    if(tabUrl.indexOf('www.cnblogs.com/TomXu/') > -1) {
        cssCode =  '#sidebar{display: none;}' + 
                '#wrapper #content {margin-right: 465px; min-height: 600px;width: 800px;margin: 0 auto;}';
    } else if(tabUrl.indexOf('http://www.css88.com/') > -1){
        cssCode = '#googlead{display: none;}';
    }
    chrome.tabs.insertCSS({
        code: cssCode
    });


});
