document.getElementById('insert-data').addEventListener('click', function() {
    const datas = [
        'employee_name',
        'employee_id',
        'date_filed',
        'reimbursement',
        'pcv',
        'total',
        'balance',
        'remarks',
        'nurse',
    ];
    var formData = new FormData();
    for (let i=0; i<datas.length; i++){
        formData.append(document.getElementById(datas[i]).value);
    }
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Data uploaded successfully');
        } else {
            console.error('Data upload failed');
        }
    })
    .catch(error=> {
        console.error('Error:', error);
    })
});

// UPDATE DATA 
document.getElementById('update-data').addEventListener('click', function() {
    const datas = [
        'employee_id',
        'date_filed',
        'date_approved',
        'status',
        'remarks',
        'supervisor',
        'manager'
    ];

    var formData = new FormData();
    for (let i=0; i<datas.length; i++){
        formData.append(document.getElementById(datas[i]).value);
    }
    
    fetch('/update', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Data updated successfully');
        } else {
            console.error('Data updated failed');
        }
    })
    .catch(error=> {
        console.error('Error:', error);
    })
});
