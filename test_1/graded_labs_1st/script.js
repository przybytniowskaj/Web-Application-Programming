function checkLiczbaOsob(theInput) {
    const regex = /^[0-9]+$/;
    inputValue = theInput.value;
    if (inputValue.lenght == 0 || inputValue == 0) {
        alert("Field can not be empty!") 
        document.getElementById("err_liczba_osob").innerHTML = "Field can not be empty!";          
        return false;
    } else if (!inputValue.match(regex)) {     
        document.getElementById("err_liczba_osob").innerHTML = "Field has to contain only numbers";          
        return false;
    } else {
        document.getElementById("err_liczba_osob").innerHTML = "";          
        return true;
    }
}

function checkZnizka(theInput) {
    const regex = /^[a-zA-Z0-9]+$/;
    inputValue = theInput.value;
    if (!inputValue.match(regex)) {
        document.getElementById("err_znizka").innerHTML = "Field has to contain at least  1 small, big letter and number";          
        return false;
    } else {
        document.getElementById("err_znizka").innerHTML = "";          
        return true;
    }
}