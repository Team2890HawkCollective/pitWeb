function updatoAlerto () {
    let doc = document.getElementById("settings"); //gets the settings form
	//populates data from form
	teamNumber = doc.elements[0].value;
	eventKey = doc.elements[1].value;
    slackAPI = doc.elements[2].value;
    slackChannel = doc.elements[3].value;
	matchNumber = doc.elements[4].value;
    willDisplayData = doc.elements[5].checked;
    
    slackReader();
    storeUsers();
    updateInspection();
}  

/**
 * Replaces src or embed to update to proper pit page
 */
function updateInspection()
{
    var eventName = "http://www.gafirst.org/peachpits/pitmap?event=" + eventKey;
    var embed = document.getElementById("inspectionStatus");
    var copy = embed.cloneNode(true);
    copy.setAttribute('src', eventName);
    embed.parentNode.replaceChild(copy, embed);
}


