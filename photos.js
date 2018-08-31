updatePhotos()
{
    storeUsers();
    slackReader();
    updateTimer();
    
    let doc = document.getElementById("settings"); //gets the settings form
	//populates data from form
	teamNumber = doc.elements[0].value;
	eventKey = doc.elements[1].value;
	slackAPI = doc.elements[2].value;
    slackChannel = doc.elements[3].value;
    twitchID = doc.elements[4].value;
	matchNumber = doc.elements[5].value;
    willDisplayData = doc.elements[6].checked;
}

/***********************************************
 * Team Profile JS
 */
//This controls the image slide show
function openImage(evt, imageName) {
    var i, tabcontent, tablinks;
   
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
   
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //This displays the block image
    document.getElementById(imageName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();