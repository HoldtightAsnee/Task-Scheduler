let startTime = document.getElementById("startTime");
let button = document.getElementById("submitButton");
function showTime(event) {
    console.log(startTime.value);
    let timeString = startTime.value;
    let hourString = timeString.slice(0, 2);
    let minuteString = timeString.slice(3);
    console.log(`Hour: ${hourString}, Minute: ${minuteString}`);
}
button.addEventListener('click',showTime);