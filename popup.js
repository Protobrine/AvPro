// Division Buttons
const btn_blocking = document.getElementById("blocking");
const btn_timing = document.getElementById("timing");
const btn_otherThings = document.getElementById("otherThings");

// Division IDs
const divblock = document.getElementById("divblock");
const divtiming = document.getElementById("divtiming");
const divother = document.getElementById("divother");

// Timing Division

const normalContainer = document.getElementById("normalContainer"),
    pomodoroContainer = document.getElementById("pomodoroContainer");

// Timing buttons
const startBtn = document.getElementById('start'),
    pauseBtn = document.getElementById('pause'),
    normalTime = document.getElementById('normalTimer'),
    pomodoroTime = document.getElementById('pomodoroTimer');

// Blocklist buttons
const btnBlockSite = document.getElementById('blockSite');

//Division others
const toDoContainer = document.getElementById('doListContainer'),
    calendarS = document.getElementById('calendarS'),
    eventBtn = document.getElementById("eventBtn"),
    eventContainer = document.getElementById("eventContainer"),
    eventBtn2 = document.getElementById("eventBtn2"),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector(".event-date"),
    eventDay1 = document.querySelector(".event-day1"),
    eventDate1 = document.querySelector(".event-date1"),
    eventsContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-btn");

//Other buttons
const toDoList = document.getElementById('toDoList');
const calendarBtn = document.getElementById('otherCalendar');

addEventListener('DOMContentLoaded', () => {
    backgroundGet();
    urlBlockTime();
    getTodos();
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

if (toDoList) {
    toDoList.addEventListener('click', () => {
        toDoContainer.style.display='block';
        calendarS.style.display='none';
        if (eventContainer.style.display = 'block') {
            eventContainer.style.display = 'none';
        }
    });
    
    calendarBtn.addEventListener('click', () => {
        toDoContainer.style.display='none';
        calendarS.style.display='block';
    });
}

if (normalTime) {
    normalTime.addEventListener('click', () => {
        normalContainer.style.display='block';
        pomodoroContainer.style.display='none';
    });

    pomodoroTime.addEventListener('click', () => {
        normalContainer.style.display='none';
        pomodoroContainer.style.display='block';
    })
}

// Designs -----------------------------------------------------------------------------------------------

// AvPro buttons -----------------------------------------------------------------------------------------------
const bottomBtnList = document.querySelectorAll('.nrmBtn')
let lastClicked;

bottomBtnList.forEach( bottomBtn => {
    lastClicked = Number(localStorage.lastClicked) 
    console.log('last saved is ' + lastClicked)

    if (isNaN(lastClicked)) {
        bottomBtnList[0].classList.add('clickedBtn');
    }

    for (let index = 0; index < bottomBtnList.length; index++) {
        if (lastClicked == index) {
            bottomBtnList[index].classList.add('clickedBtn');
            switch (index) {
                case 0:
                    divblock.style.display='block';
                    divtiming.style.display='none';
                    divother.style.display='none';
                    break;

                case 1:
                    divblock.style.display='none';
                    divtiming.style.display='block';
                    divother.style.display='none';
                    break;

                case 2:
                    divblock.style.display='none';
                    divtiming.style.display='none';
                    divother.style.display='block';
                    break;
            }
        }
    }
    
    bottomBtn.addEventListener('click', () => {
        document.querySelector('.clickedBtn')?.classList.remove('clickedBtn');
        bottomBtn.classList.add('clickedBtn');
        console.log('Added the css ' + bottomBtn);

        for (let index = 0; index < bottomBtnList.length; index++) {
            if (bottomBtn == bottomBtnList[index]) {
                console.log('bottomBtn, the same with the ' + index)
                localStorage.lastClicked = index;
            }
        }
    });
});

// Other buttons -----------------------------------------------------------------------------------------------
const otherBtns = document.querySelectorAll('.nrmBtnOth')
let lastOthClicked;

otherBtns.forEach( otherBtn => {

    lastOthClicked = Number(localStorage.lastClickedOth) 
    console.log('last othBtn saved is ' + lastOthClicked)

    console.log('otherBtn[0] yes ' + otherBtn[0])

    if (isNaN(lastOthClicked)) {
        otherBtns[0].classList.add('clickedBtnOth');
    }

    for (let index = 0; index < otherBtns.length; index++) {
        if (lastOthClicked == index) {
            otherBtns[index].classList.add('clickedBtnOth');
            switch (index) {
                case 0:
                    toDoContainer.style.display='block';
                    calendarS.style.display='none';
                    break;

                case 1:
                    toDoContainer.style.display='none';
                    calendarS.style.display='block';
                    break;
            }
        }
    }

    otherBtn.addEventListener('click', () => {
        document.querySelector('.clickedBtnOth')?.classList.remove('clickedBtnOth');
        otherBtn.classList.add('clickedBtnOth');

        for (let index = 0; index < otherBtns.length; index++) {
            if (otherBtn == otherBtns[index]) {
                console.log('otherBtns, the same with the ' + index)
                localStorage.lastClickedOth = index;
            }
        }
    });
});

// Timer buttons -----------------------------------------------------------------------------------------------

const timerBtns = document.querySelectorAll('.nrmBtnTime')
let lastTimeClicked;

timerBtns.forEach( timerBtn => {

    lastTimeClicked = Number(localStorage.lastClickedTime) 

    console.log("Time clicked is " + lastTimeClicked);

    if (isNaN(lastTimeClicked)) {
        timerBtns[0].classList.add('clickedBtnTime');
    }

    for (let index = 0; index < timerBtns.length; index++) {
        if (lastTimeClicked == index) {
            timerBtns[index].classList.add('clickedBtnTime');
            switch (index) {
                case 0:
                    normalContainer.style.display='block';
                    pomodoroContainer.style.display='none';
                    break;

                case 1:
                    normalContainer.style.display='none';
                    pomodoroContainer.style.display='block';
                    break;
            }
        }
    }

    timerBtn.addEventListener('click', () => {
        document.querySelector('.clickedBtnTime')?.classList.remove('clickedBtnTime');
        timerBtn.classList.add('clickedBtnTime');

        for (let index = 0; index < timerBtns.length; index++) {
            if (timerBtn == timerBtns[index]) {
                console.log('timerBtns, the same with the ' + index)
                localStorage.lastClickedTime = index;
            }
        }
    });
});

//Timer functions -----------------------------------------------------------------------------------------------

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
        alert("Press ok to refresh the page")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
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

        if (anotherTotal > 0) {
        const bgHours = Math.floor(anotherTotal / 3600).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const bgMinutes = Math.floor((anotherTotal % 3600)/60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const bgSeconds = (anotherTotal % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}); 

        document.getElementById('hours').value = bgHours;
        document.getElementById('minutes').value = bgMinutes;
        document.getElementById('seconds').value = bgSeconds;

        countdownUpdate();
        }
    });
}

function countdownUpdate() {
    
    let totalSeconds = getValue(seconds);
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    document.getElementById("blocking").disabled = true;
    bottomBtnList[0].classList.add('disabledBtn');
    document.getElementById("pomodoroTimer").disabled = true;
    timerBtns[1].classList.add('disabledBtnTime');

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
            document.getElementById("blocking").disabled = false;
            document.querySelector('.disabledBtn').classList.replace('disabledBtn' ,'nrmBtn');
            document.getElementById("pomodoroTimer").disabled = false;
            document.querySelector('.disabledBtnTime').classList.replace('disabledBtnTime' ,'nrmBtnTime');
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
    console.log("background check " + totalSeconds)
    chrome.runtime.sendMessage({
        method: 'send',
        key: 'key',
        value: totalSeconds
    }, () => {
    });
}

// Pomodoro Timer -----------------------------------------------------------------------------------------------

const pomoStart = document.getElementById('pomoStart');
const pomoReset = document.getElementById('pomoReset');

let workTitle = document.getElementById("work");
let breakTitle = document.getElementById("break");

function getPomoTimer() {
    chrome.runtime.sendMessage({method: 'sendPomo', key: 'key',}, (response) => {
        let pomoObj = response.value;
        console.log("PomoObj check: " + pomoObj.workTime + " " + pomoObj.breakTime + " " + pomoObj.seconds + " " + pomoObj.breakCount);

        document.getElementById("pomoMinutes").innerHTML = pomoObj.workTime.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        document.getElementById("pomoSeconds").innerHTML = pomoObj.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

        if (pomoObj.breakCount == 0) {
            breakTitle.classList.remove('active');
            workTitle.classList.add('active');

        } else {
            if (pomoObj.breakCount % 2 == 0) {
                breakTitle.classList.remove('active');
                workTitle.classList.add('active');
    
            } else {
                workTitle.classList.remove('active');
                breakTitle.classList.add('active');
    
            }
        }

        if (pomoObj.pomoSwitch == "On") {
            pomodoStart();
        } 
    })
}

addEventListener('DOMContentLoaded', () => {
    getPomoTimer()
});

if (pomoStart) {
    pomoStart.addEventListener('click', () => {
        pomodoStart();
        chrome.runtime.sendMessage({
            method: 'pomoBg', 
            key: 'key', 
            value: "Start"
        }, () => {
        });
        alert("Press ok to refresh the page")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });
    
    pomoReset.addEventListener('click', () => {
        pomodoReset();
    })
}

function pomodoStart() {

    let workTime = document.getElementById("pomoMinutes").innerHTML;
    let seconds = document.getElementById("pomoSeconds").innerHTML;
    let actualWork = 25;
    let breakTime = 5;
    let breakCount;

    console.log("Worktime check " + workTime);

    document.getElementById("normalTimer").disabled = true;
    timerBtns[0].classList.add('disabledBtnTime');
    document.getElementById("blocking").disabled = true;
    bottomBtnList[0].classList.add('disabledBtn');
    
    pomoStart.style.display='none';
    pomoReset.style.display='block';

    let workMinutes = workTime;

    if (seconds == 00) {
        seconds = 59;
        workMinutes = workMinutes - 1;
    }    
        
    if (workTitle.classList.contains('active')) {
        breakCount = 0
    } else if (breakTitle.classList.contains('active')) {
        breakCount = 1
    } else {
        breakCount = 0;
    }

    let timerFunction = () => {
        document.getElementById("pomoMinutes").innerHTML = workMinutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        document.getElementById("pomoSeconds").innerHTML = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

        console.log("Pomo seconds is " + seconds)
        seconds = seconds - 1;

        if (seconds == -1) {
            workMinutes = workMinutes -1;
            console.log("Pomo minutes is " + workMinutes)
            if (workMinutes == -1) {
                if (breakCount % 2 == 0) {
                    workMinutes = breakTime - 1;
                    breakCount++

                    workTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                } else {
                    workMinutes = actualWork - 1;
                    breakCount++

                    breakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    pomo = setInterval(timerFunction, 1000);
}

function pomodoReset() {
    let workTime = 25;

    clearInterval(pomo);
    pomoStart.style.display='block';
    pomoReset.style.display='none';

    chrome.runtime.sendMessage({
        method: 'pomoBg', 
        key: 'key', 
        value: "Reset"
    }, () => {
    });

    document.getElementById("pomoMinutes").innerHTML = workTime.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    document.getElementById("pomoSeconds").innerHTML = "00";

    workTitle.classList.add('active');
    breakTitle.classList.remove('active');

    document.getElementById("blocking").disabled = false;
    document.querySelector('.disabledBtn').classList.replace('disabledBtn' ,'nrmBtn');
    document.getElementById("normalTimer").disabled = false;
    document.querySelector('.disabledBtnTime').classList.replace('disabledBtnTime' ,'nrmBtnTime');
}

//Blacklist -----------------------------------------------------------------------------------------------

const urlList = document.getElementById("urlList");

if (btnBlockSite) {
    btnBlockSite.addEventListener('click', () => {
      chrome.runtime.sendMessage({method: 'urlGet', key: 'key',}, (response) => {
        urlBlock = response.value;
        if (urlBlock == 'dupe') {
            window.alert('This website is already blocked')
        } else {
            window.alert('You have blocked ' + urlBlock)
            const blockedUrl = getUrl();
            const storeButton = getButton();

            let urlobject = {
            id: Math.floor(Math.random() * 100000),
            content: urlBlock
            };

            let buttonObj = {
                id: "btn" + urlobject.id,
                content: "-"
            };

            const urlElement = createList(urlobject.id, urlobject.content);
            urlList.appendChild(urlElement);

            const buttonElem = createButton(buttonObj.id, buttonObj.content);
            const elementId = document.getElementById(urlobject.id);
            elementId.appendChild(buttonElem)

            // const lineBreak = document.createElement("hr");
            // urlList.appendChild(lineBreak);

            blockedUrl.push(urlobject);
            storeButton.push(buttonObj);
            saveUrl(blockedUrl);
            saveButton(storeButton);
            urlBlockTime();
        }
      })
    })
  }

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

function createList(id, content) {
    const element = document.createElement("li");

    element.classList.add("theUrls");
    element.appendChild(document.createTextNode(content));
    element.id = id;
    
    return element;
}

function createButton(id, content) {
    const button = document.createElement("button");

    button.classList.add('urlButton');
    button.appendChild(document.createTextNode(content));
    button.id = id;

    button.addEventListener('click', () => {
        console.log('It is removed ' + id);
        const uSure = confirm('Are you sure you want to remove this?');
        if (uSure) {
            removeButton(id, button)
        }
    })

    return button;
}

getUrl().forEach(theUrls => {
    const urlElement = createList(theUrls.id, theUrls.content);
    urlList.appendChild(urlElement);

    // const lineBreak = document.createElement("hr");
    // urlList.appendChild(lineBreak);
});
    
getButton().forEach(urlButton => {
    let newId = urlButton.id
    newId = newId.replace('btn', '');

    const theUrls = document.getElementById(newId);
    const buttonElement = createButton(urlButton.id, urlButton.content);
    theUrls.appendChild(buttonElement, theUrls);
})


function saveButton(urlButton) {
    localStorage.setItem("urlButton", JSON.stringify(urlButton));
}

function getButton() {
    return JSON.parse(localStorage.getItem("urlButton") || "[]");
}

function saveUrl(blockedUrl) {
    localStorage.setItem("urlToBlock", JSON.stringify(blockedUrl))
}

function getUrl() {
    return JSON.parse(localStorage.getItem("urlToBlock") || "[]");
}

function removeButton(id, element) {
    const button = getButton().filter(urlButton => urlButton.id != id)
    let newId = id;
    newId = newId.replace('btn', '');
    const theUrls = document.getElementById(newId);

    const url = getUrl().filter(blockedUrl => blockedUrl.id != newId)
    const btnUrl = document.getElementById(id).parentElement;

    let linkOnly = btnUrl.innerText;
    linkOnly = linkOnly.replace('-', '');

    console.log(linkOnly);
    chrome.runtime.sendMessage({
        method: 'getLink',
        key: 'key',
        value: linkOnly
    }, () => {
    });

    saveUrl(url);
    saveButton(button);

    theUrls.removeChild(element);
    urlList.removeChild(btnUrl);

}

//To do list -----------------------------------------------------------------------------------------------

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

if (todoButton) {
    todoButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteCheck);
}

function addTodo() {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveList(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    todoInput.value='';
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] == 'delete-btn') {
        const todo = item.parentElement;

        todo.classList.add('fall');
        console.log(todo);
        removeTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] == 'completed-btn') {
        let todos;

        if (localStorage.getItem('todos') == null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

    const todo = item.parentElement;
    todo.classList.toggle("completed");
    
    const todoIndex = todo.children[0].innerText;

    const findIt = (text) => text.content == todoIndex;
    const classIndex = (todos.findIndex(findIt))

    console.log(classIndex)

        switch (todos[classIndex].class) {
            case 'completed':
                todos[classIndex].class = 'ongoing'
                break;
            case 'ongoing':
                todos[classIndex].class = 'completed'
                break;
        }

    localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function saveList(todo) {
    let todos; 
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    let todosObj = {
        content: todo,
        class: 'ongoing'
    }

    todos.push(todosObj)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos; 

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        
        if (todo.class == 'completed') {
            console.log('This is completed ' + todo.content)
            todoDiv.classList.toggle("completed");
        }

        console.log(todo.content);

        const newTodo = document.createElement('li');
        newTodo.innerText = todo.content;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
}

function removeTodos(todo) {
    let todos; 

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos);
    }

    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex);

    const objectIndex = todos.findIndex((findIt) => findIt.content == todoIndex);
    todos.splice(objectIndex, 1);
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Calendar -----------------------------------------------------------------------------------------------

const theCalendar = document.querySelector(".calendarS"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const eventsArr = [];

getEvents();

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
    
    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`
    }

    for (let i = 1; i <= lastDate; i++) {

        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day == i &&
                eventObj.month == month + 1 &&
                eventObj.year == year
            ) {
                event = true;
            }
        });

        if (
        i == new Date().getDate() && 
        year == new Date().getFullYear() &&
        month == new Date().getMonth()
        ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            } else {
                days += `<div class="day today active">${i}</div>`;
            }
        }
        else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            } else {
                days += `<div class="day">${i}</div>`;
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;

    addListner();

}

initCalendar();

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar()
}

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

todayBtn.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

    if (dateInput.value.length == 2) {
        dateInput.value += "/"
    }

    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0,7);
    }

    if (e.inputType == "deleteContentBackward") {
        if (dateInput.value.length == 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener('click', gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");

    if (dateArr.length == 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("invalid date");
}

if (eventBtn) {
    eventBtn.addEventListener('click', () => {
        eventContainer.style.display = 'block';
        calendarS.style.display = 'none';
    });
    
    eventBtn2.addEventListener('click', () => {
        eventContainer.style.display = 'none';
        calendarS.style.display = 'block';
    });
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector('.event-time-from'),
    addEventTo = document.querySelector('.event-time-to');

addEventBtn.addEventListener('click', () => {
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener('click', () => {
    addEventContainer.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove('active');
    }
})

addEventTitle.addEventListener('input', (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

addEventFrom.addEventListener('input', (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length == 2) {
        addEventFrom.value += ":";
    }

    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
})

addEventTo.addEventListener('input', (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length == 2) {
        addEventTo.value += ":";
    }

    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
})

function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener('click', (e) => {

            activeDay = Number(e.target.innerHTML);

            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            days.forEach((day) => {
                day.classList.remove("active");
            });

            if (e.target.classList.contains('prev-date')) {
                prevMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll(".day");

                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            day.innerHTML == e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    })
                }, 100)
            } else if (e.target.classList.contains('next-date')) {
                nextMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll(".day");

                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") &&
                            day.innerHTML == e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    })
                }, 100)
            }
            else {
                e.target.classList.add("active");
            }
        });
    });
}

function getActiveDay(date) {
    const day = new Date(year, month, date)
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
    eventDay1.innerHTML = dayName;
    eventDate1.innerHTML = date + " " + months[month] + " " + year;
}

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (
            date == event.day &&
            month + 1 == event.month &&
            year == event.year
        ) {
            event.events.forEach((event) => {
                events += `
                <div class = "event">
                    <div class = "titles">
                        <i class = "fas fa-circle"></i>
                        <h3 class = "event-title">${event.title}</h3>
                    </div>
                    <div class = "event-time">
                        <span class = "event-time">${event.time}</span>
                    </div>
                </div>
                `;
            })
        }
    })

    if (events == "") {
        events = `
        <div class = "no-event">
        <h3>No Events</h3>
        </div>`
    }

    eventsContainer.innerHTML = events;

    saveEvents();
}

addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if (
        eventTitle == "" ||
        eventTimeFrom == "" ||
        eventTimeTo == ""
    ) {
        alert("Please fill all the fields");
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    
    if (
        timeFromArr.length != 2 ||
        timeToArr.length != 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
     ) {
        alert("Invalid Time Format");
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeto = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeto,
    };

    let eventAdded = false;

    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (
                item.day == activeDay &&
                item.month == month + 1 &&
                item.year == year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        })
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    addEventContainer.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    updateEvents(activeDay);

    const activeDayElem = document.querySelector(".day.active");
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }

});

function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

eventsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains("event")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;

        eventsArr.forEach((event) => {
            if (
                event.day == activeDay &&
                event.month == month + 1 &&
                event.year == year
            ) {
                event.events.forEach((item, index) => {
                    if (item.title == eventTitle) {
                        event.events.splice(index, 1);
                    }
                });

                if (event.events.length == 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);

                    const activeDayElem = document.querySelector(".day-active");
                    if (activeDayElem.classList.contains("event")) {
                        activeDayElem.classList.remove("event");
                    }
                }
            }
        });

        updateEvents(activeDay);
    }
})

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
    if (localStorage.getItem("events") == null )   {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

// How to get the object thingy
// const urls = getUrl();
    // const findUrls = urls.find(content => content.id == newId);
    // const urlContent = findUrls.content;

// Get active tab but also errors
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     if (tabs[0] == undefined) {
//         document.getElementById('linkNow').innerHTML = 'No site detected';
//         console.log('This query undefined');
//     } else {
//         let tab = tabs[0];
//         let nowTab = tab.url;
//         document.getElementById('linkNow').innerHTML = nowTab;
//     }
// });

// Sending errors
// chrome.runtime.onMessage.addListener(
//     function(message, sender, sendResponse) {
//         if (message.msg == "getUrlText") {
//             let textUrl = message.value;
//             document.getElementById('linkNow').innerHTML = textUrl;
//         }
//     }
// );