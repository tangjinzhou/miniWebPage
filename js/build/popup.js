$(function(){var b={},i=[],g="",f="",d={},a=$("#reader"),c=$("#addRule"),h=true;chrome.storage.sync.get(null,function(k){var l;if(_.size(k)>0){l=k}else{$.get("/myStyle.json",function(m){l=JSON.parse(m);chrome.storage.sync.set(l)})}for(var j in l){b[j.toLowerCase()]=l[j];i.push(j.toLowerCase())}});chrome.windows.getCurrent(function(j){chrome.tabs.query({active:true,windowId:j.id},function(k){d=k[0];d.tabId=d.id;e()})});function e(){var l=d.url.split("?")[0].toLowerCase();if(b[l]){g+=b[l].css;f+=b[l].script||""}else{for(var k=0,j=i.length;k<j;k++){if(l.indexOf(i[k])>-1){l=i[k];g+=b[l].css||"";f+=b[l].script||"";break}}}if(!b[l]){a.addClass("disable");h=false}}a.on("click",function(){if(h){chrome.browserAction.setIcon({path:"icon-open.png",tabId:d.tabId});chrome.tabs.insertCSS(d.tabId,{code:g});f="try{"+f+"}catch(e){}";chrome.tabs.executeScript(d.tabId,{code:f})}})});