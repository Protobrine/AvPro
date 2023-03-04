// Division Buttons
const btn_blocking = document.getElementById("blocking");
const btn_timing= document.getElementById("timing");
const btn_otherThings = document.getElementById("otherThings");
// Division IDs
const divblock = document.getElementById("divblock");
const divtiming = document.getElementById("divtiming");
const divother = document.getElementById("divother");
// Timing buttons
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
// Blocklist buttons
const testButton = document.getElementById('testBlock');
const btnBlockSite = document.getElementById('blockSite');

addEventListener('DOMContentLoaded', () => {
    backgroundGet();
});

if (btn_blocking) {
    btn_blocking.addEventListener('click', () =>{
        divblock.style.display='block';
        divtiming.style.display='none';
        divother.style.display='none';
    });
    
    btn_timing.addEventListener('click', () =>{
        divblock.style.display='none';
        divtiming.style.display='block';
        divother.style.display='none';
    });
    
    btn_otherThings.addEventListener('click', () =>{
        divblock.style.display='none';
        divtiming.style.display='none';
        divother.style.display='block';
    });
}


//Timer functions

if (pauseBtn) {
    pauseBtn.addEventListener('click' , () => {
        clearInterval(yes);
        document.getElementById("start").disabled = false;
        document.getElementById("pause").disabled = true;
        let totalSeconds = 0;
        chrome.runtime.sendMessage({
            method: 'send',
            key: 'key',
            value: totalSeconds
        }, () => {
        });
    });
}
if (startBtn) {
    startBtn.addEventListener('click', () => {
        countdownUpdate();
        chromeCount();
        urlBlockTime();
    });
}

const addValue = function(numHours, numMinutes, numSeconds) {
    return +numSeconds + +(numMinutes*60) + +(numHours*3600);
}

function backgroundGet(anotherTotal) {
    chrome.runtime.sendMessage({method: 'recv',key: 'key',}, (response) => {
        totalSec = response.value;
        anotherTotal = totalSec;
        console.log(anotherTotal);
        const bgHours = Math.floor(anotherTotal / 3600).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const bgMinutes = Math.floor((anotherTotal % 3600)/60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const bgSeconds = (anotherTotal % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}); 

        document.getElementById('hours').value = bgHours;
        document.getElementById('minutes').value = bgMinutes;
        document.getElementById('seconds').value = bgSeconds;
        countdownUpdate();
    });
}

function countdownUpdate() {
    
    let totalSeconds = getValue(seconds);
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    yes = setInterval(counting, 1000);
    function counting() {
        if (totalSeconds >= 0) {
            console.log('Countdown update ' + totalSeconds)
            const updateHours = Math.floor(totalSeconds / 3600).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            const updateMinutes = Math.floor((totalSeconds % 3600)/60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            const updateSeconds = (totalSeconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            
            hrs.innerHTML = updateHours;
            min.innerHTML = updateMinutes;
            sec.innerHTML = updateSeconds;
            document.getElementById('hours').value = updateHours;
            document.getElementById('minutes').value = updateMinutes;
            document.getElementById('seconds').value = updateSeconds;
        } else if (totalSeconds <= 0) {
            clearInterval(yes);
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            document.getElementById("start").disabled = false;
        }
        totalSeconds--;
    } 
}

function getValue(seconds) {
    const userHours = document.getElementById('hours').value;
    const userMinutes = document.getElementById('minutes').value;
    const userSeconds = document.getElementById('seconds').value;
    seconds = addValue(userHours, userMinutes, userSeconds);
    return seconds;
}

function chromeCount() {
    let totalSeconds = getValue(seconds);
    chrome.runtime.sendMessage({
        method: 'send',
        key: 'key',
        value: totalSeconds
    }, () => {
    });
}

// //Blacklist?

if (btnBlockSite) {
    btnBlockSite.addEventListener('click', () => {
      chrome.runtime.sendMessage({method: 'urlGet', key: 'key',}, (response) => {
        urlBlock = response.value;
        if (urlBlock == 'dupe') {
            alert('This website is already blocked')
        } else {
            alert('You have blocked ' + urlBlock)
            const blockedUrl = getUrl();
            let urlobject = {
            id: Math.floor(Math.random() * 100000),
            content: urlBlock
            }
            blockedUrl.push(urlobject);
            saveUrl(blockedUrl);
        }
      })
    })
  }
  
function saveUrl(blockedUrl) {
localStorage.setItem("urlToBlock", JSON.stringify(blockedUrl))
}

function getUrl() {
return JSON.parse(localStorage.getItem("urlToBlock") || "[]");
}

// if (testButton) {
// testButton.addEventListener('click', () => {
//     urlBlockTime();
// })
// }

function urlBlockTime() {
const blockedUrl = getUrl();
    for (let index = 0; index < blockedUrl.length; index++) {
    let urlCheck = Object.values(blockedUrl[index]);
        console.log('Checking URL ' + urlCheck[1]);
    chrome.runtime.sendMessage({
        method: 'urlSend',
        key: 'key',
        value: urlCheck[1]
    })
    }
}