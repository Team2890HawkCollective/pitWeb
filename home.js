function initHome()
{
    slackReader();
    storeUsers();
    updateHomepage();
    updateHomepagePeriodic();
}

/**
 * Runs when settings are changed and updates the data on the webpage
 */
function updateHomepage()
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

	matchNumber = (getNextMatch(Date.now(), teamNumber, eventKey, willDisplayData, matchNumber)).match_number;

	//updates data on webpage
    updateRank(teamNumber, eventKey, willDisplayData);
    updateAllianceColor(eventKey, teamNumber, matchNumber, willDisplayData);
	updateTimer();
	changeChannelID();
}

/**
 * Periodically update the page and it's values
 */
function updateHomepagePeriodic()
{
	let interval = setInterval(function() {
		updateHomepage();
	}, 1000);
}