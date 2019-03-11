function updatoAlerto () {
    let doc = document.getElementById("settings"); //gets the settings form
	//populates data from form
	teamNumber = doc.elements[0].value;
	eventKey = doc.elements[1].value;
    slackAPI = doc.elements[2].value;
    slackChannel = doc.elements[3].value;
    matchNumber = doc.elements[4].value;
    pitMap = doc.elements[5].value;
    willDisplayData = doc.elements[6].checked;
    
    slackReader();
    storeUsers();
    updateInspection();
}  

function updateInspection()
{
    var eventName = "http://www.gafirst.org/peachpits/pitmap?event=" + pitMap;
    var embed = document.getElementById("inspectionStatus");
    var copy = embed.cloneNode(true);
    copy.setAttribute('src', eventName);
    embed.parentNode.replaceChild(copy, embed);
}


