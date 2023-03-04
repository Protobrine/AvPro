let value = 0;
let url;
const blockedSites = [];

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
    case 'webUrl':
      url = message.value;
      console.log('The background url is ' + url);
      break;
    case 'blockIt':
      const equalBlocked = blockedSites.includes(url);
      if (value > 0) {
        if (equalBlocked) {
          console.log('Procrastinated');
          sendResponse({value: 'block'})
        }
      }
      break;
    case 'urlGet':
      const dupeCheck = blockedSites.includes(url)
      if (dupeCheck) {
        url = 'dupe';
      }
      sendResponse({value: url});
      break;
    case 'urlSend':
      allUrl = message.value;
      const blockedDupe = blockedSites.includes(allUrl);
      if (!blockedDupe) {
        console.log('added ' + allUrl)
        blockedSites.push(allUrl);
      } else {
        console.log('Dupe')
      }
      console.log("Sites to be blocked: " + blockedSites);
      break;
  }
  return true;
});