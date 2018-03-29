let httpRequest; //Used to pull data
let teamNumber;
let eventKey; //a unique identifier for an event from TBA. typically formatted as ####*****
let matchNumber;
let willDisplayData; //Whether or not to print out the data requested from TheBlueAlliance to the console
let slackAPI; //API key for the slack bot
let slackChannel; //Channel ID for the slackbot
//let currentTime = (Date.now()/1000);

/**
 * Runs on startup
 */
function initClock()
{
	storeUsers();
	slackReader();
	updatePage();
	updatePagePeriodic();
	if (matchNumber != "null")
	{
		matchNumber = null;
	}
}

/**
 * Runs when settings are changed and updates the data on the webpage
 */
function updatePage()
{
	let doc = document.getElementById("settings"); //gets the settings form
	//populates data from form
	teamNumber = doc.elements[0].value;
	eventKey = doc.elements[1].value;
	slackAPI = doc.elements[2].value;
	slackChannel = doc.elements[3].value;
	matchNumber = doc.elements[4].value;
	willDisplayData = doc.elements[5].checked;

	updateTimer();

	matchNumber = (getNextMatch(Date.now())).match_number;

	//updates data on webpage
	updateAllianceColor();
	updateMatchSchedule(compareUsingMatchNumber);
	updateRank();
	updateWinLossTie();
	updateTeamMates(isBlue(getMatch(getMatches())));
	updateOpponents(isBlue(getMatch(getMatches())));
}

/**
 * Periodically update the page and it's values
 */
function updatePagePeriodic()
{
	let interval = setInterval(function() {
		updatePage();
	}, 1000);
}

/**
 * This function will change the alliance color on the webpage
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {team number in format frc####} teamNumber 
 * @param {match number} matchNumber 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData
 */
function updateAllianceColor()
{
	//Sorts down to the individual match, determines the color, and sets the color on the webpage
	setAllianceColor(isBlue(getMatch(getMatches())));
}

/**
 * Returns all the matches for a specific team at a specific event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData
 */
function getMatches()
{
	//Pulls data from TBA in JSON format, turns the JSON data into an array of JS objects
	return JSON.parse(requestData('https://www.thebluealliance.com/api/v3/team/' + teamNumber + '/event/' + eventKey + '/matches', willDisplayData));
}

/**
 * Finds and returns the match data for a given match number from a given set of matches
 * @param {Data to access and look through, usually from getMatches()} data 
 * @param {match number} matchNumber 
 */
function getMatch(data)
{
	return findItem(data, 'match_number', matchNumber);
}

/**
 * Looks through the given data to determine if a given team number is on the blue(true) or red(false) alliance
 * @param {Data to access and look through, usually from getMatch()} data 
 * @param {team number in format frc####} teamNumber 
 */
function isBlue(data)
{
	if (data.alliances.blue.team_keys.includes(teamNumber))
	{
		return true;
	}
	return false;
}

/**
 * Sets the allyColor div to be blue or red depending on the value given
 * @param {match number} matchNumber 
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function setAllianceColor(isBlue)
{
	if (isBlue)
	{
		document.getElementById("allyColor").style.backgroundColor = "blue";
		document.getElementById("allyColor").innerHTML = "<p>Blue - Q" + matchNumber;
	}
	else
	{
		document.getElementById("allyColor").style.backgroundColor = "red";
		document.getElementById("allyColor").innerHTML = "<p>Red - Q" + matchNumber;
	}
}

/**
 * Returns an array of match numbers for the given event and team number
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getMatchNumbers()
{
	let matchNumbers;
	let data = getMatches(); //Gets an array of match objects from TheBlueAlliance
	//Builds an array of just the match numbers from the data returned by getMatches
	for (let i = 0; i < data.length; i++)
	{
		matchNumbers[i] = data[i].match_number.value;
	}
	return matchNumbers;
}

/**
 * updates the teammates div to display the correct teammates for the given event, match number, and alliance color, excluding given team number
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 * @param {Match number} matchNumber
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function updateTeamMates(isBlue)
{
	document.getElementById("teammates").innerHTML = getTeamMates(isBlue);
}

/**
 * returns an array of teammates for the given event, matchnumber, and alliance color, formats them to remove the "frc" prefix, excluding the given team
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 * @param {Match number} matchNum 
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function getTeamMates(isBlue)
{
	let match = getMatch(getMatches()); //Gets the match object
	
	if (isBlue)
	{
		let teamMates = match.alliances.blue.team_keys; //Grabs the names of the teams on the blue alliance
		document.getElementById("teammates").style.backgroundColor = "blue"; //sets the color of the text to blue
		return formatTeams(teamMates); //removes "frc" prefix
	}
	else
	{
		let teamMates = match.alliances.red.team_keys; //Grabs the names of the teams on the red alliance
		document.getElementById("teammates").style.backgroundColor = "red"; //sets the color of the text to red
		return formatTeams(teamMates); //removes the "frc" prefix
	}
}

/**
 * Removes the "frc" prefix from the teams, while excluding the given team number from the results if provided
 * @param {Array of team numbers to format} array 
 * @param {OPTIONAL: team to be excluded from results} teamNumber 
 */
function formatTeams(array)
{
	let output = "";

	for (let i = 0; i < array.length; i++)
	{
		//filters out the given team number
		if (array[i] != teamNumber)
		{
			output += array[i].substring(3) + "<br>"; //removes the "frc" prefix
		}
	}

	return output;
}

/**
 * updates the opponents div to display the correct opponents for the given event, match number, and alliance color. basically the same as updateTeamMates
 * @param {team number in format frc####. Required to get the list of matches} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 * @param {Match number} matchNum 
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function updateOpponents(isBlue)
{
	document.getElementById("opponents").innerHTML = getOpponents(isBlue);
}

/**
 * returns an array of teammates for the given event, matchnumber, and alliance color, formats them to remove the "frc" prefix, excluding the given team
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 * @param {Match number} matchNum 
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function getOpponents(isBlue)
{
	let match = getMatch(getMatches())
	
	if (isBlue)
	{
		let opponents = match.alliances.red.team_keys; //Grabs the names of the teams on the red alliance
		document.getElementById("opponents").style.backgroundColor = "red";
		return formatTeams(opponents); //removes "frc" prefix
	}
	else
	{
		let opponents = match.alliances.blue.team_keys; //Grabs the names of the teams on the blue alliance
		document.getElementById("opponents").style.backgroundColor = "blue";
		return formatTeams(opponents); //removes "frc" prefix
	}
}

//function getCurrentMatch(eventKey)
//Doesn't work with TBA, use FRC Hybrid Schedule call to get only matches that have played, and go from there.

/**
 * updates the rank div to display the correct rank for the given event and team number
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function updateRank()
{
	document.getElementById("rank").innerHTML = 'Rank: <br>' + getRank();
}

/**
 * Returns the rank of the given team at the given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getRank()
{
	let info = getTeamInfo(); //grabs the info for the team
	return info.qual.ranking.rank; //returns only the rank from the team info
}

/**
 * updates the wlt div to display the correct winn/loss/tie record for the given team at the given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function updateWinLossTie()
{
	document.getElementById("wlt").innerHTML = getWinLossTie(getWins(), getLosses(), getTies()); //updates the html with thewlt record
}

/**
 * Formats the wins, losses, and ties as WINS/LOSSES/TIES
 * @param {Numbers of wins} wins 
 * @param {number of losses} losses 
 * @param {number of ties} ties 
 */
function getWinLossTie(wins, losses, ties)
{
	return (wins + "/" + losses + "/" + ties);
}

/**
 * Returns the number of wins for a given team at a given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getWins()
{
	let info = getTeamInfo();
	return info.qual.ranking.record.wins;
}

/**
 * Returns the number of losses for a given team at a given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getLosses()
{
	let info = getTeamInfo();
	return info.qual.ranking.record.losses;
}

/**
 * Returns the number of ties for a given team at a given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getTies()
{
	let info = getTeamInfo();
	return info.qual.ranking.record.ties;
}

/**
 * Returns the team info for a given team at a given event in a javascript-readable format
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getTeamInfo()
{
	return JSON.parse(requestData('https://www.thebluealliance.com/api/v3/team/' + teamNumber + '/event/' + eventKey + '/status')); //parses and return the JSON data recieved
}

/**
 * Requests and returns the data from a given url
 * @param {url} url 
 */
function requestData(url)
{
	httpRequest = new XMLHttpRequest(); //creates a new HTTPRequest object

	httpRequest.open('GET', url, false); //opens the request with type GET, at url, and asynchronous set to false. AKA making it synchronous
	httpRequest.setRequestHeader('X-TBA-Auth-Key', 'myFFDC2rIF5OG0jI4y5ixf2UHGPek94D2uirVx76hqoqx7R3ihmkQR81JCWoVayP'); //Sets the authorization header for TheBlueAlliance API
	httpRequest.send(); //Sends the request

	if (willDisplayData)
	{
		return displayData(); 
	}
	else
	{
		return (httpRequest.responseText); //Returns the data
	}
}

/**
 * Helper function of requestData that displays the requested data in the console, and return the data
 */
function displayData(data)
{
	console.log("Data Displayed");
	console.log(data);
	return (data);
}

/**
 * Looks for the object in the data with the given value for the given property
 * @param {Data to look through} data 
 * @param {property to compare} keyName 
 * @param {value of property to comare to} keyValue 
 */
function findItem(data, keyName, keyValue)
{
	//Run through the array of objects
	for (let i = 0; i < data.length; i++)
	{
		//If the object has a property with name keyName and value keyValue, return that object
		if (data[i][keyName] == keyValue)
		{
			return data[i];
		}
	}
	return;
}