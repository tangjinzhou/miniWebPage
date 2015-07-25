
var myStyles = {},
    myTabs = [];
    //alert(1)
$.get('/myStyle.json', function(resObj) {
    var resObj = JSON.parse(resObj);
    for (var key in resObj) {
        myStyles[key.toLowerCase()] = resObj[key];
        myTabs.push(key.toLowerCase());
    };
});

chrome.browserAction.onClicked.addListener(function(tab) {
    var app = {
        initialize: function() {
            var self = this;
            this.myStyles = myStyles;
            this.myTabs = myTabs;
            this.updateCss();
        },
        updateCss: function(){

            var tabUrl = tab.url.toLowerCase(),
                tabTitle = tab.title,
                cssCode = this.myStyles["default"];
            if(this.myStyles[tabUrl]){
                cssCode += this.myStyles[tabUrl];
            } else {
                for (var i = 0, len = this.myTabs.length; i < len; i++) {
                    if(tabUrl.indexOf(this.myTabs[i]) > -1) {
                        tabUrl = this.myTabs[i];
                        cssCode += this.myStyles[tabUrl];
                        break;
                    }
                }
            }

            chrome.browserAction.setIcon({
                path: 'icon-open.png',
                tabId: tab.id
            })
            chrome.tabs.insertCSS(tab.id,{
                code: cssCode
            });

        }
    }
    app.initialize();
});
