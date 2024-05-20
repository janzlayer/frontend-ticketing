function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let amPm = 'AM';
    
    let formattedHours = hours;
    if (hours > 12) {
      formattedHours = String(hours - 12).padStart(2, '0');
      amPm = 'PM';
    } else if (hours === 12) {
      amPm = 'PM';
    } else if (hours === 0) {
      formattedHours = '12';
    }
    
    const timeString = `${formattedHours}:${minutes}:${seconds} ${amPm}`;
    
    document.getElementById('clock').textContent = timeString;
  }
  
  setInterval(updateClock, 1000);
  updateClock();