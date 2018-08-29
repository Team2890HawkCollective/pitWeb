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
	matchNumber = doc.elements[4].value;
	willDisplayData = doc.elements[5].checked;

	matchNumber = (getNextMatch(Date.now(), teamNumber, eventKey, willDisplayData, matchNumber)).match_number;

	//updates data on webpage
    updateRank(teamNumber, eventKey, willDisplayData);
    updateAllianceColor(eventKey, teamNumber, matchNumber, willDisplayData);
	updateTimer();
}

/**
 * Periodically update the page and it's values
 */
function updateHomepagePeriodic()
{
	let interval = setInterval(function() {
		updatePage();
	}, 60000);
}