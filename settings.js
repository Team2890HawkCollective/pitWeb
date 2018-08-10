let settingsForm = document.getElementById('settings'); //Grab the settings form

//If the local storage is empty, populate it
if(!localStorage.getItem('teamNumber')) {
    populateStorage();
} 
else 
{
    setStyles();
}

/**
 * Populates the local storage with the values from the form
 */
function populateStorage() {
    localStorage.setItem('teamNumber', settingsForm.elements[0].value);
    localStorage.setItem('eventKey', settingsForm.elements[1].value);
    localStorage.setItem('matchNumber', settingsForm.elements[2].value);

    setStyles();
}

/**
 * Fill the form with the values from local storage
 */
function setStyles() {
    teamNumber = localStorage.getItem('teamNumber');
    eventKey = localStorage.getItem('eventKey');
    matchNumber = localStorage.getItem('matchNumber');

    settingsForm.elements[0].value = teamNumber;
    settingsForm.elements[1].value = eventKey;
    settingsForm.elements[2].value = matchNumber;
}   

//If the settings change, re-populate the localstorage
settingsForm.onchange = populateStorage; 