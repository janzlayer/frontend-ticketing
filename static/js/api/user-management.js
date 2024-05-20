document.getElementById('insert-data').addEventListener('click', function(){
    const datas = [
            'employee_id',
            'datehired',
            'firstname',
            'middlename',
            'surname',
            'email',
            'number',
            'department',
            'position',
            'password'
        ]

        var formData = new FormData();
        for (let i=0; i<datas.length; i++){
            let element = document.getElementById(datas[i]);
            (element) ? formData.append(datas[i], element.value) : console.error(datas[i] + " is not found")
            console.log(datas[i], element.value)
        }
 
        fetch('/user_add', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok){
                alert('User upload successfully')
                location.reload()
            } else {
                alert('User uploading failed');
                location.reload()
            }
        })
        .catch(error=> {
            console.error('Error:', error);
        })
});
