// === CONFIG ===
let buttonSelector = ".fc-close"; // or '.your-class-name'
let hideSelector = ".fc-dialog-container"; // Selector for element to hide

// === AUTO CLICK LOGIC ===
function clickButton(selector) {
  const button = document.querySelector(selector || buttonSelector);
  if (button) {
    button.click();
    console.log("✅ Auto-clicked button:", selector || buttonSelector);
    return true;
  } else {
    console.log("❌ Button not found:", selector || buttonSelector);
    return false;
  }
}

function hideElement(selector) {
  const element = document.querySelector(selector || hideSelector);
  if (element) {
    element.style.display = "none !important";
    element.style.visibility = "hidden !important";
    console.log("✅ Element hidden:", selector || hideSelector);
    return true;
  } else {
    console.log("❌ Element not found:", selector || hideSelector);
    return false;
  }
}

// Wait for DOM to be ready
window.addEventListener("load", () => {
  setTimeout(() => {
    // Try to click the button
    clickButton();

    // Try to hide element if hideSelector is set
    if (hideSelector) {
      hideElement();
    }
  }, 500); // Delay in case page content is lazy-loaded
});

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "triggerClick") {
    const clicked = clickButton(message.selector);
    sendResponse({ success: clicked });
  } else if (message.action === "updateSelector") {
    buttonSelector = message.selector;
    console.log("Selector updated to:", buttonSelector);
    sendResponse({ success: true });
  } else if (message.action === "hideElement") {
    const hidden = hideElement(message.selector);
    sendResponse({ success: hidden });
  } else if (message.action === "updateHideSelector") {
    hideSelector = message.selector;
    console.log("Hide selector updated to:", hideSelector);
    sendResponse({ success: true });
  }
  return true;
});

// Load saved selectors from storage
chrome.storage.sync.get(["buttonSelector", "hideSelector"], function (data) {
  if (data.buttonSelector) {
    buttonSelector = data.buttonSelector;
  }
  if (data.hideSelector) {
    hideSelector = data.hideSelector;
  }
});
