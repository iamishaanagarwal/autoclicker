// Background script for the Auto Click Button extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Auto Click Button extension installed');
});

// Optional: Add message handling between popup and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "performClick") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          // Trigger click via messaging to content script
          chrome.tabs.sendMessage(tabs[0].id, { action: "triggerClick" });
        }
      });
    });
  }
  return true;
});