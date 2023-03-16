// Division Buttons
const btn_blocking = document.getElementById("blocking");
const btn_timing = document.getElementById("timing");
const btn_otherThings = document.getElementById("otherThings");
// Division IDs
const divblock = document.getElementById("divblock");
const divtiming = document.getElementById("divtiming");
const divother = document.getElementById("divother");
// Timing buttons
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
// Blocklist buttons
// const testButton = document.getElementById('testBlock');
const btnBlockSite = document.getElementById('blockSite');

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

// Designs -----------------------------------------------------------------------------------------------

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
                console.log('Its the same with the ' + index)
                localStorage.lastClicked = index;
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

//To do list / Calendar -----------------------------------------------------------------------------------------------

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

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
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
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