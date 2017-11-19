const APPLICABLE_URLS = ["http://www.torrents9.pe"];
const TITLE_APPLY = "Activer Torrent9++";
const TITLE_REMOVE = "Desactiver Torrent9++";

function protocolIsApplicable(url) {
	var anchor =  document.createElement('a');
	anchor.href = url;
	return APPLICABLE_URLS.includes(anchor.origin);
}

function initializePageAction(tab){
	if (protocolIsApplicable(tab.url)) {

		function gotTitle(title) {
			if (title == TITLE_REMOVE)
			{
				browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
				browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
			}
			else
			{
				browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
				browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
				browser.tabs.executeScript(
					tab.id,
					{
						file: "tab_script.js"
					}
				);
			}
		}

		var AD_TORRENT9PlusPlus = localStorage.getItem("AD_TORRENT9PlusPlus")
		if (AD_TORRENT9PlusPlus == "false")
			browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
		else
			browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});

		browser.pageAction.show(tab.id);

		var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
		gettingTitle.then(gotTitle);
	}
}

var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
	for (let tab of tabs) {
		initializePageAction(tab);
	}
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
	initializePageAction(tab);
});


browser.pageAction.onClicked.addListener(function(tab){
	function gotTitle2(title) {
		if (title == TITLE_APPLY)
		{
			localStorage.setItem("AD_TORRENT9PlusPlus", true);
			browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
			browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
			browser.tabs.executeScript(
				tab.id,
				{
					file: "tab_script.js"
				}
			);
		}
		else
		{
			browser.tabs.executeScript(
				tab.id,
				{
					code: "window.location.reload(true);"
				}
			);
			localStorage.setItem("AD_TORRENT9PlusPlus", false);
			browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
			browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
		}
	}


	var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
		gettingTitle.then(gotTitle2);
});