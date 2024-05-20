function showLeft(){
    const leftContainer = document.getElementById('left-container');
    const leftArrow = document.getElementById('arrow-left');

    if (!leftContainer.classList.contains('hide')){
        leftContainer.style.width = '0px';
        leftArrow.style.transform = 'rotate(180deg)';
        leftContainer.classList.add('hide');
    } else {
        leftContainer.style.width = '380px';
        leftArrow.style.transform = 'rotate(0deg)';
        leftContainer.classList.remove('hide');
    }
}

function showRight(){
    const rightContainer = document.getElementById('right-container');
    const rightArrow = document.getElementById('arrow-right');

     if (!rightContainer.classList.contains('hide')){
        rightContainer.style.width = '0px';
        rightArrow.style.transform = 'rotate(180deg)';
        rightContainer.classList.add('hide');
    } else {
        rightContainer.style.width = '380px';
        rightArrow.style.transform = 'rotate(0deg)';
        rightContainer.classList.remove('hide');
    }
}

function showMenu() {
    const MenuContainer = document.getElementById('menu-container');
    const caretDown = document.getElementById('caret-down');

    if (!MenuContainer.classList.contains('open')) {
        MenuContainer.style.height = '12vh';
        caretDown.style.transform = 'rotate(180deg)';
        MenuContainer.classList.add('open');
    } else {
        MenuContainer.style.height = '0px';
        caretDown.style.transform = 'rotate(0deg)';
        MenuContainer.classList.remove('open');
    }
}



document.querySelectorAll('.module').forEach(function(modules) {
    modules.addEventListener('mouseover', function() {
        modules.querySelector('.hover-line').classList.add('hover');
    });
    
    modules.addEventListener('mouseout', function() {
        modules.querySelector('.hover-line').classList.remove('hover');
    });
});

const datefile = document.querySelectorAll('.date-file');
const today_date = new Date();
    datefile.forEach(function(date) {
    date.value = formatDate(today_date);
});


function formatDate(inputDate) {
    // Parse the input date string into a Date object
    const date = new Date(inputDate);

    // Get the month, day, and year components
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    // Return the formatted date as "Month day, year"
    return `${monthNames[monthIndex]} ${day}, ${year}`;
}
 

 
  



