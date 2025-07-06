
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  // Get the ID of the current tab
  const currentTabId = tabs[0].id;

  // Execute your real content script on that tab
  chrome.scripting.executeScript({
    target: { tabId: currentTabId },
    files: ['js/popup.js'] // This is your ORIGINAL script file
  });
});