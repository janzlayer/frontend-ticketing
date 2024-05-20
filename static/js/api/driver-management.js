document.getElementById('insert-data').addEventListener('click', function(){
    const datas = [
            'driver_id',
            'driver_name',
            'driver_phone'
        ]

        var formData = new FormData();
        for (let i=0; i<datas.length; i++){
            let element = document.getElementById(datas[i]);
            (element) ? formData.append(datas[i], element.value) : console.error(datas[i] + " is not found")
            console.log(datas[i], element.value)
        }

        var fileInput = document.getElementById('driver_img');
        var file = fileInput.files[0]

        formData.append('driver_img', file)
        
        fetch('/driver_add', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok){
                alert('Driver upload successfully')
                location.reload()
            } else {
                alert('Driver uploading failed');
                location.reload()
            }
        })
        .catch(error=> {
            console.error('Error:', error);
        })
});
