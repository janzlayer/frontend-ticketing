document.getElementById('insert-data').addEventListener('click', function(){
    const datas = [
            'vehicle_type',
            'vehicle_make',
            'vehicle_model',
            'plate_number',
            'transmission'
        ]

        var formData = new FormData();
        for (let i=0; i<datas.length; i++){
            let element = document.getElementById(datas[i]);
            (element) ? formData.append(datas[i], element.value) : console.error(datas[i] + " is not found")
            console.log(datas[i], element.value)
        }

        var fileInput = document.getElementById('vehicle_img');
        var file = fileInput.files[0]

        formData.append('vehicle_img', file)
        
        fetch('/vehicle_add', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok){
                alert('Vehicle upload successfully')
                location.reload()
            } else {
                alert('Vehicle uploading failed');
                location.reload()
            }
        })
        .catch(error=> {
            console.error('Error:', error);
        })
});


function vehicleChange(){
    stats = document.getElementById('popStatus').textContent

    id = document.getElementById('popPlatenum').textContent
    fetch('/vehicle_change', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"_id":id, "st": stats = stats == "Reserved" ? "0" : "1"})
    })
    .then(response => {
        if (response.ok){
            location.reload()
        } else {
            alert('Vehicle change failed');
        }
    })
    .catch(error=> {
        console.error('Error:', error);
    })
}
