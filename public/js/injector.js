const browser = this.browser || this.chrome;
browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const currentTabId = tabs[0].id;

  browser.scripting.executeScript({
    target: { tabId: currentTabId },
    files: ['js/injected.js']
  });
});