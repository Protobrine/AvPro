let value = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.method) {
    case 'send':
      value = message.value;
      if (value > 0) {
        bgInterval = setInterval(backgroundTime, 1000);
      }
      function backgroundTime() {
        if (value > 0) {
          console.log('receiverUpdate ' + value)
          value--;
        } else if (value <= 0) {
          clearInterval(bgInterval);
          console.log('Background Cleared');
        }
      }
      break;
    case 'recv':
      sendResponse({value: value});
      break;
  }
  return true;
});