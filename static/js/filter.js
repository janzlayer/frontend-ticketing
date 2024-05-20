function statChanged(myBool, myData){
    var selected = document.getElementById('table_filter').value;
    for(let x of myData){
        if(x['st'] == selected){
            //console.log(x['_id'] +":"+x['st'] +" : "+ (x['st'] == '1' ? "APPROVED":x['st']==2 ?"REJECTED":"PENDING" ) +": "+rowIndex.toString());
            document.getElementById(x['_id']).classList.remove('hidden');
        }else if("3" == selected){
            document.getElementById(x['_id']).classList.remove('hidden');
        }            
        else{
            document.getElementById(x['_id']).classList.add('hidden');
        }
    }
}



function nameFilter(myData){
    var nameInput = document.getElementById('name_input').value;
    for(let x of myData){
        if(x['n'].toLowerCase().includes(nameInput.toLowerCase())){
            document.getElementById(x['_id']).classList.remove('hidden');
        }else{
            document.getElementById(x['_id']).classList.add('hidden');
        }
    }
}

function dateFilter(myData){
    const startDateStr = document.getElementById('dstart').value;
    const endDateStr = document.getElementById('dend').value;
    var startFilter = new Date(startDateStr);
    startFilter.setDate(startFilter.getDate() - 1); //little correction for conditional statement
    const endFilter = new Date(endDateStr);

    for(let x of myData){
        var filterDate = new Date(x['rq']['r']);
        if(filterDate >= startFilter  && endFilter >= filterDate){
            document.getElementById(x['_id']).classList.remove('hidden');
        }else{
            document.getElementById(x['_id']).classList.add('hidden');
        }
    }
}


function showDateFilter(){
   
    const calendarBtn = document.getElementById('filterCalendar');
    const dateFilter = document.getElementById('datefilter-holder');
    const dateIcon = document.getElementById('date-icon'); 
    console.log(calendarBtn)

    if (!dateFilter.classList.contains('hide')){
        dateFilter.style.width = '215px';
        dateIcon.classList.remove('fa-calendar');
        dateIcon.classList.add('fa-compress');
        dateFilter.classList.add('hide');
    } else {
        calendarBtn.style.backgroundColor = '#00aaad';
        dateFilter.style.width = '0px';
        dateIcon.classList.remove('fa-compress');
        dateIcon.classList.add('fa-calendar');
        dateFilter.classList.remove('hide');
    }
}
