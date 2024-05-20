

var drivers = {
    "driver1": "Driver 1",
    "driver2": "Driver 2"
};

// Get the dropdown element
var dropdown = document.getElementById("drivers");


for (var key in drivers) {
    if (drivers.hasOwnProperty(key)) {
        var option = document.createElement("option");
        option.text = drivers[key];
        option.value = key;
        dropdown.add(option);
    }
}