const currentTime = new Date();
const formattedTime = formatTime(currentTime);

document.getElementById('time').value = formattedTime;

function formatTime(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  hours = hours < 10 ? '0' + hours : hours; 
  minutes = minutes < 10 ? '0' + minutes : minutes; 
  return hours + ':' + minutes;
}