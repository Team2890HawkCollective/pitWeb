let twitchID;

/***********************************************
 * Game LiveStream JS 
 */

 //This changes the channel ID for the twitch player
 function changeChannelID()
 {
    let doc = document.getElementById("settings"); //gets the settings form
	//populates data from form
	teamNumber = doc.elements[0].value;
	eventKey = doc.elements[1].value;
	slackAPI = doc.elements[2].value;
    slackChannel = doc.elements[3].value;
    twitchID = doc.elements[4].value;
	matchNumber = doc.elements[5].value;
    willDisplayData = doc.elements[6].checked;
    
    document.getElementById("twitchplayer").src= "https://player.twitch.tv/?channel=" + twitchID;
 }
 