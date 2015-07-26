$(function() {
    var myStyles = {},
        myTabs = [],
        cssCode = '',
        tab = {},
        $reader = $('#reader'),
        $addRule = $('#addRule'),
        havaReader = true;

    $.get('/myStyle.json', function(resObj) {
        var resObj = JSON.parse(resObj);
        for (var key in resObj) {
            myStyles[key.toLowerCase()] = resObj[key];
            myTabs.push(key.toLowerCase());
        };
    });

    chrome.windows.getCurrent(function(currentWindow) {
        chrome.tabs.query({
                active: true,
                windowId: currentWindow.id
            },
            function(activeTabs) {
                tab = activeTabs[0];
                tab.tabId = tab.id;
                updataCSS();
            });
    });

    function updataCSS() {
        var tabUrl = tab.url.split('?')[0].toLowerCase();
        if (myStyles[tabUrl]) {
            cssCode += myStyles[tabUrl];
        } else {
            for (var i = 0, len = myTabs.length; i < len; i++) {
                if (tabUrl.indexOf(myTabs[i]) > -1) {
                    tabUrl = myTabs[i];
                    cssCode += myStyles[tabUrl];
                    break;
                }
            }
        }
        if (!myStyles[tabUrl]) {
            $reader.addClass('disable');
            havaReader = false;
        }
    }

    $reader.on('click', function() {
        //$('#test').text(cssCode);
        if (havaReader) {
            chrome.browserAction.setIcon({
                path: 'icon-open.png',
                tabId: tab.tabId
            })
            chrome.tabs.insertCSS(tab.tabId, {
                code: cssCode
            });
        }
    })


});


//chrome.extension.isAllowedFileSchemeAccess(function(isAllowedAccess) {
// alert(FileReader)
// var file = 'file:///Users/tangjinzhou/code/miniWebPage/myStyle.json';
// var reader = new FileReader();
// reader.onload = function(event) {
//     alert(1);
//     var contents = event.target.result;
//     alert("File contents: " + contents);
// };

// reader.onerror = function(event) {
//     alert("File could not be read! Code ");
// };

// reader.readAsText(file);
//});
// chrome.browserAction.onClicked.addListener(function(tab) {
//     var app = {
//         initialize: function() {
//             this.updateCss();
//         },
//         updateCss: function() {
//             var tabUrl = tab.url.split('?')[0].toLowerCase(),
//                 cssCode = myStyles["default"];
//             if (myStyles[tabUrl]) {
//                 cssCode += myStyles[tabUrl];
//             } else {
//                 for (var i = 0, len = myTabs.length; i < len; i++) {
//                     if (tabUrl.indexOf(myTabs[i]) > -1) {
//                         tabUrl = myTabs[i];
//                         cssCode += myStyles[tabUrl];
//                         break;
//                     }
//                 }
//             }
//             //alert(JSON.stringify(tab))
//             if(myStyles[tabUrl]) {
//                 chrome.browserAction.setIcon({
//                     path: 'icon-open.png',
//                     tabId: tab.tabId
//                 })
//                 //alert(chrome.tabs.insertCSS);
//                 //setTimeout(function(){
//                     //alert(2)
//                     chrome.tabs.insertCSS(tab.tabId, {
//                         code: cssCode
//                     });
//                 //}, 3000)

//             }
//         }
//     }
//     if(tab.url != 'about:blank'){
//         //app.initialize();
//     }
// });
