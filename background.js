let value = 0;
let url;
const blockedSites = [];


let workTime = 25;
let breakTime = 5;
let seconds = "00";
let breakCount = 0
let pomoSwitch = "Off"
let pomoTimer = {
  workTime: workTime,
  breakTime: breakTime,
  seconds: seconds,
  breakCount: breakCount,
  pomoSwitch: pomoSwitch
}

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

    case 'urlChange':
      sendResponse({value: url});
      break;

    case 'blockIt':
      const equalBlocked = blockedSites.includes(url);
      if (value > 0) {
        if (equalBlocked) {
          console.log('Procrastinated');
          sendResponse({value: 'block'})
        }
      }
      if (pomoValue > 0) {
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

    case 'getLink':
      getLink = message.value;
      
      blockedSites.splice(blockedSites.indexOf(getLink), 1);
      url = getLink;
      console.log(blockedSites)
      break;

    case 'pomoBg':
      pomoCheck = message.value;
      if (pomoCheck == "Start") {
        console.log("Background pomo check " + pomoTimer.workTime + " " + pomoTimer.breakTime + " " + pomoTimer.seconds);
        pomoValue = 1;

        pomoTimer.pomoSwitch = "On"
        pomoTimer.seconds = 59;

        // let workMinutes = pomoTimer.workTime - 1;
        // let breakMinutes = pomoTimer.breakTime - 1;

        pomoTimer.workTime = pomoTimer.workTime - 1;
        pomoTimer.breakTime = pomoTimer.breakTime - 1;

        let timerFunction = () => {

          console.log("PomoBg seconds is " + pomoTimer.seconds)
          pomoTimer.seconds = pomoTimer.seconds - 1;

          if (pomoTimer.seconds == -1) {
            pomoTimer.workTime = pomoTimer.workTime -1;
            console.log("PomoBg minutes is " + pomoTimer.workTime)
              
              if (pomoTimer.workTime == -1) {

                  if (pomoTimer.breakCount % 2 == 0) {
                    pomoTimer.workTime = pomoTimer.breakTime;
                    pomoTimer.breakCount++
                    console.log("Take a break -pomo: " + pomoTimer.breakCount);
                    pomoValue = 0;

                  } else {
                    pomoTimer.workTime = (workTime-1);
                    pomoTimer.breakCount++
                    console.log("Continue working -pomo: " + pomoTimer.breakCount);
                    pomoValue = 1;

                  }
              }
              pomoTimer.seconds = 59;
          }
        }
        
        pomo = setInterval(timerFunction, 1000);
      } else if (pomoCheck == "Reset") {
        clearInterval(pomo);
        pomoTimer = {
          workTime: workTime,
          breakTime: breakTime,
          seconds: seconds,
          breakCount: breakCount,
          pomoSwitch: pomoSwitch
        }
        pomoValue = 0;
      }
      
      break;

    case 'sendPomo':
      sendResponse({value: pomoTimer});
      break;
  }
  return true;
});

// Sending errors on popup
// function sendUrlText(url) {
//   chrome.runtime.sendMessage({
//     method: 'getUrlText',
//     key: 'key',
//     value: url
//   }, () => {
//   });
// }