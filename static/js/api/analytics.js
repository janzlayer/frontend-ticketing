function generate(){
    var selectedElement = document.getElementById('table_filter');
    var selectedOption = selectedElement.options[selectedElement.selectedIndex].textContent;
    var filterValue = document.getElementById('filter_value').value;

    
    fetch('/vrf_report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"type":selectedOption, "value": filterValue})
    })
    .then(response => {
        if (response.ok){
            alert('Request Submitted');
            return response.json();
        } else {
            alert('Request Failed');
        }
    })
    .then(data =>{
        console.log(data.data);
        var tableBody = document.getElementById('myTable');

        tableBody.innerHTML = "";

        data.data.forEach(function(item){
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + item.car + "</td><td>" + item._id + "</td><td>" + item.use + "</td>";
            tableBody.appendChild(row);
        });
    })
    .catch(error=> {
        console.error('Error:', error);
    })




}

function statChanged(){
    var selectedElement = document.getElementById('table_filter');
    var selectedOption = selectedElement.options[selectedElement.selectedIndex].textContent;
    if(selectedOption == "Generic"){
        document.getElementById('filter_value').setAttribute("placeholder", "this should be empty");
    }else if(selectedOption == "By Month"){
        document.getElementById('filter_value').setAttribute("placeholder", "number of the month (5 = 'May')");
    }else if(selectedOption == "By Name"){
        document.getElementById('filter_value').setAttribute("placeholder", "name of user");
    }else if(selectedOption == "By Status"){
        document.getElementById('filter_value').setAttribute("placeholder", "status of ticket (0, 1 or 2)");
    }
}