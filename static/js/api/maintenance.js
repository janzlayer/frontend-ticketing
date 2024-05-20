// INSERT DATA
// console.log({{ session['user']['p'] | tojson }})
function yyyymmddFormat(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.getElementById('insert-data').addEventListener('click', function() {
    const datas = [
        'employee_name',
        'department',
        'work_category',
        'location',
        'estimated_budget',
        'work_details',
        'materials_txt',
        
    ];
    var formData = new FormData();
    for (let i=0; i<datas.length; i++){
        let element = document.getElementById(datas[i]);
        (element) ? formData.append(datas[i], element.value) : console.error(datas[i] + " is not found")
        console.log(datas[i], element.value)
    }
    var fileInput = document.getElementById('work_img');
    var file = fileInput.files[0];

    formData.append('date_filed', yyyymmddFormat(document.getElementById('date_filed').value));
    formData.append('eid', document.getElementById('employee_name').getAttribute('name'));
    formData.append('work_img', file)

    fetch('/mnt_insert', {
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
  
function updater(event){
    var approver_name = document.getElementById("session_name").textContent
    var approver_pos = document.getElementById("session_pos").textContent.replace(/^\(|\)$/g, '').replace(/^\s+/, '').replace(/\s+$/, '');
    var date_approved = new Date();

    const datas = [
        'ticket_id'
    ];
    var formData = new FormData();
    for (let i=0; i<datas.length; i++){
        let element = document.getElementById(datas[i]);
        (element) ?  formData.append(datas[i], element.outerText) : console.error(datas[i] + " is not found")
    }

    (event.target.id == 'completed') ?  formData.append("status", "1") : 
    (event.target.id == 'process')    ?  formData.append("status", "2") :
    (event.target.id == 'deny') ?  formData.append("status", "3") : 
    null
    
    formData.append("view-date_filed", yyyymmddFormat(document.getElementById('view-date_filed').textContent));
    formData.append("date_approved", yyyymmddTimeFormat(date_approved));
    formData.append("approver_name", approver_name);
    formData.append("approver_pos", approver_pos);
    formData.append("message", document.getElementById("message").value);
    
    for (var pair of formData.entries()){
        console.log(pair[0] + " is " + pair[1])
    }
    fetch('/mnt_update', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        (response.ok) ?  location.reload() : console.error('Data updated failed');
    })
    .catch(error=> {
        console.error('Error:', error);
    });
}


document.getElementById('deny').addEventListener('click', updater);
document.getElementById('process').addEventListener('click', updater);
document.getElementById('completed').addEventListener('click', updater);

