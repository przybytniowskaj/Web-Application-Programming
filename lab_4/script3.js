/**
 * 
 * @param {HTMLInputElement}
 *            element
 */
function getLabelFor(element) {
    "use strict";
    var allLabels = document.getElementsByTagName("label");

    for (var i = 0; i < allLabels.length; i++) {
	if (element === allLabels.item(i).control) {
	    return allLabels.item(i).textContent;
	}
    }

    return "<unknown>";
}

/**
 * 
 * @param {HTMLInputElement}
 *            element
 */
function notEmptyValidation(element) {
    "use strict";
    if (/\S/.test(element.value)) {
	return true;
    } else {
	window.alert(getLabelFor(element) + " must not be empty!");
	return false;
    }
}

/**
 * 
 * @param {HTMLInputElement}
 *            element
 */
function validatePESEL(element) {
    "use strict";
    var val = element.value;
    if (/[0-9]{11}/.test(val)) {
	var y = parseInt(val.substring(0, 2), 10);
	var m = parseInt(val.substring(2, 4), 10);
	var d = parseInt(val.substring(4, 6), 10);

	if (m < 20) {
	    y += 1900;
	    // simple case
	} else if (m < 40) {
	    m -= 20;
	    y += 2000;
	} else if (m < 60) {
	    m -= 40;
	    y += 2100;
	} else if (m < 80) {
	    m -= 60;
	    y += 2200;
	} else {
	    m -= 80;
	    y += 1800;
	}

	var dob = new Date(y, m - 1, d);
	if (dob.getDate() == d && dob.getMonth() == m - 1) {

	    var age = getAge(dob);
	    document.getElementById("age").value=age;
	    return true;
	    
	} else {
	    window.alert(getLabelFor(element) + " must contain valid DOB!");
	    return false;
	}
    } else {
	window.alert(getLabelFor(element) + " must be exactly 11 digits!");
	return false;
    }
}

/**
 * 
 * @param {Date} dob Date of birth
 * @returns {Number}
 */
function getAge(dob) {
    "use strict";
    var today = new Date();

    var age = today.getFullYear() - dob.getFullYear();
    if (dob.getMonth() > today.getMonth()
	|| (dob.getMonth() == today.getMonth() && dob.getDate() > today
	    .getDate())) {
	return age-1;
    } else {
	return age;
    }
}

/**
 * 
 * @param {HTMLInputElement} element
 * @param {Number} minAge
 */
function validateMinVal(element, minAge) {
    "use strict";
    if(parseInt(element.value) >= minAge)
	return true;
    else {
	window.alert(getLabelFor(element) + " must be at least "+minAge);
	return false;
    }
}

function setValidation() {
    "use strict";
    var sn = document.getElementById("surname");
    sn.onchange = function() {
	return notEmptyValidation(sn);
    };

    var idt = document.getElementById("id");
    idt.onchange = function() {
	return notEmptyValidation(idt);
    };
    
    var pesel = document.getElementById("pesel");
    pesel.onchange = function() {
	return validatePESEL(pesel);
    };
    
    var age = document.getElementById("age");
    
    document.getElementById("el-form").onsubmit = function () {
	return validatePESEL(pesel)&& notEmptyValidation(idt) 
	    && notEmptyValidation(sn) && validateMinVal(age, 10);
    };
}
