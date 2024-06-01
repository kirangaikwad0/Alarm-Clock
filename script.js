const selectMenu = document.querySelectorAll("select");
const realTime = document.getElementById("time");
const numDate = document.getElementById("numDate");
const setAlarmBtn = document.getElementById("btn-setAlarm");
const alarmStop = document.getElementById("stopAlarm");
const ring = new Audio("./Alarm-ringtone.mp3");
const alarmList = document.getElementById("alarmList1");
let alarmCount;
let alarmTime;
let hms;
let myInterval;
let alarmListArr = [];

// To get Date , month and year
var now = new Date();

const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");

var mo = now.getMonth();
var dnum = now.getDate();
var yr = now.getFullYear();
const formattedDate = `${dnum}/${mo}/${yr}`;
numDate.innerText = formattedDate;
// End of get Date , month , year

// To get value of select option in hour
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value ="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
// End

//// To get value of select option in minutes
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value ="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
// End

// To get value of select option AM/PM
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value ="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// To get time in the form hr:mm:ss Am/Pm
setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h == 0 ? (h = 12) : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  realTime.innerText = `${h}:${m}:${s} ${ampm}`;
  hms = `${h}:${m}:${ampm}`;
}, 1000);

// Setting alarm
function setAlarm() {
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;

  if (
    time.includes("setHour") ||
    time.includes("setMinute") ||
    time.includes("AM/PM")
  ) {
    alert("Please, Select Valide Input");
  } else {
    alarmCount++;
    document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

    alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
    alarmListArr.push(alarmTime);
    alert(`Your Alarm Set ${alarmTime}.`);
    ringtone();
  }
}

//setting Eventlistener on set alarm button
setAlarmBtn.addEventListener("click", setAlarm);

//playing Ringtone
function ringtone() {
  myInterval = setInterval(() => {
    if (alarmTime == hms) {
      ring.play();
      document.querySelector("#stopAlarm").style.visibility = "visible";
    }
  }, 1000);
}

//Stop alarm
function stopAlarm() {
  alarmStop.addEventListener("click", () => {
    ring.pause();
    alarmStop.style.visibility = "hidden";
    clearInterval(myInterval);
  });
}

//delete alarm
function deleteAlarm(click_id) {
  var element = document.getElementById("alarm" + click_id);
  var deleteIndex = alarmListArr.indexOf(
    document.querySelector("#span" + click_id).innerText
  );
  alarmListArr.splice(deleteIndex, 1);
  element.remove();
  alert(`Your Alarm ${click_id} Delete.`);
}
