let alarmTimeInput = document.getElementById('alarmTime');
let setAlarmButton = document.querySelector('button[onclick="setAlarm()"]');
let stopAlarmButton = document.querySelector('button[onclick="stopAlarm()"]');
let audio = new Audio('alarm.mp3');
let alarmInterval;
let alarms = [];

function setAlarm() {
  let alarmTime = alarmTimeInput.value;
  if (alarmTime === '') {
    alert('Please set a valid alarm time.');
    return;
  }

  let now = new Date();
  let alarmDateTime = new Date(now.toDateString() + ' ' + alarmTime);
  let timeUntilAlarm = alarmDateTime - now;

  if (timeUntilAlarm <= 0) {
    alert('Please set a future alarm time.');
    return;
  }

  alarmInterval = setTimeout(() => {
    playAlarm();
    alert('Alarm is going off!');
  }, timeUntilAlarm);

  alarms.push(alarmDateTime);
  updateAlarmsList();

  alert('Alarm is set!');
}

function stopAlarm() {
  if (alarmInterval) {
    clearTimeout(alarmInterval);
    alarmInterval = null;
    audio.pause();
  }
}

function playAlarm() {
  audio.play();
}

function updateAlarmsList() {
  let alarmsList = document.getElementById('alarms');
  alarmsList.innerHTML = '';

  alarms.forEach((alarm, index) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `${formatTime(alarm)} <button onclick="deleteAlarm(${index})">Delete</button>`;
    alarmsList.appendChild(listItem);
  });
}

function deleteAlarm(index) {
  alarms.splice(index, 1);
  updateAlarmsList();
}

function formatTime(date) {
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateTime() {
  let now = new Date();
  let timeElement = document.getElementById('time');
  timeElement.textContent = formatTime(now);
}

// Update the clock every second
setInterval(updateTime, 1000);

// Initial update
updateTime();
