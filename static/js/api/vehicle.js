function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(':');

    let hoursNumber = parseInt(hours);
    const amPm = hoursNumber >= 12 ? 'PM' : 'AM';

    if (hoursNumber > 12) {
        hoursNumber -= 12;
    } else if (hoursNumber === 0) {
        hoursNumber = 12;
    }
    return `${hoursNumber}:${minutes} ${amPm}`;
}

function yyyymmddFormat(inputDate) { 
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
  
document.getElementById('insert-data').addEventListener('click', function(){
    const datas = [
        'vehicle_type',
        'transmission_type',
        'with_driver',
        'purpose',
        'departure_time',
        'departure_date',
        'returning_date',
    ];
     
    var formData = new FormData();
    for (let i=0; i<datas.length; i++){
        console.log(datas[i], " : ",document.getElementById(datas[i]).value)
        formData.append(datas[i], document.getElementById(datas[i]).value);
    }

    formData.append('date_filed', yyyymmddFormat(document.getElementById('date_filed').value));
    formData.append('eid', document.getElementById('session_name').getAttribute('name'));
    formData.append('n', document.getElementById('session_name').outerText);
    formData.append('s', document.getElementById('session_pos').getAttribute('name'));
    
    fetch('/vrf_insert', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok){
            alert('Request Submitted')
            location.reload()
        } else {
            alert('Request Failed');
            location.reload()
        }
    })
    .catch(error=> {
        console.error('Error:', error);
    })
});

function yyyymmddTimeFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}


function updater(event) {
    var approver_name = document.getElementById("session_name").innerText;
    var approver_pos = document.getElementById("session_pos").innerText.replace(/^\(|\)$/g, '').replace(/^\s+/, '').replace(/\s+$/, '');
    var date_approved = new Date();

    const datas = [
        'ticket_number',
        'view-branch',
    ];

    var formData = new FormData();
    for (let i=0; i<datas.length; i++){
        // console.log(datas[i], " : ", document.getElementById(datas[i]).textContent);
        formData.append(datas[i], document.getElementById(datas[i]).textContent);
    }

    if(event.target.id == 'approve'){
        formData.append('st', "1");
        for(var x=0; x<carSelected.length; x++){
            formData.append(carSelected[0][x], carSelected[1][x]);  
        }
        formData.append("view-date_filed", yyyymmddFormat(document.getElementById('view-date_filed').textContent));
        formData.append("approver_name", approver_name);
        formData.append("approver_pos", approver_pos);
        formData.append('view-purpose', document.getElementById('view-purpose').value);
        formData.append("date_approved", yyyymmddTimeFormat(date_approved));
        formData.append("message", document.getElementById("message").value);

        if(document.getElementById("view-with_driver").textContent == "YES"){
            if(document.getElementById('checkboxDriver').checked){
                formData.append("drivers_name", document.getElementById('drivers_name').value)
                formData.append("drivers_contact", document.getElementById('drivers_contact').value)
            } else {
                var dropdown = document.getElementById("drivers");
                console.log(dropdown.options[dropdown.selectedIndex].value);
                formData.append("dvr", dropdown.options[dropdown.selectedIndex].value);
            } 
        } 
        
    } else if (event.target.id == 'deny') {
        formData.append('st', "2");
        formData.append("view-date_filed", yyyymmddFormat(document.getElementById('view-date_filed').textContent));
        formData.append("approver_name", approver_name);
        formData.append("approver_pos", approver_pos);
        formData.append('view-purpose', document.getElementById('view-purpose').value);
        formData.append("date_approved", yyyymmddTimeFormat(date_approved));
        formData.append("message", document.getElementById("message").value);
    }
   
    for(let x of formData.entries()){
        console.log(x[0] + ":" + x[1]);
    }

    fetch('/vrf_update', {
       method: 'POST',
       body: formData
    })
    .then(response => {
       if (response.ok) {
           console.log('Data updated successfully');
           location.reload()
       } else {
           console.error('Data updated failed');
           location.reload() // 5-14-2024 data is failed but it will still update the data. This is for the mean time
       }
    })
    .catch(error=> {
       console.error('Error:', error);
    })
};
