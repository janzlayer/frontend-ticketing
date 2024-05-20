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

function formatDate(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthName = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    return monthName + ' ' + day + ', ' + year;
}
