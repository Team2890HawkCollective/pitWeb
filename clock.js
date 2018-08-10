let httpRequest; //Used to pull data
let teamNumber;
let eventKey; //a unique identifier for an event from TBA. typically formatted as ####*****
let matchNumber;
let willDisplayData; //Whether or not to print out the data requested from TheBlueAlliance to the console

//UNDER CONSTRUCTION
function countdown()
{
	console.log("minutes" + minutes);
	console.log("seconds" + seconds);
	
	let interval = setInterval(function() {
		let el = document.getElementById("clock");
		if (seconds == 0)
		{
			if (minutes == 0)
			{
				el.style.width = "0%";
				clearInterval(interval);
				return;
			}
			else
			{
				minutes--;
				seconds = 59;
			}
		}
		if (minutes < 5)
		{
			if (seconds % 2 == 0)
			{
				document.getElementById("timer").style.backgroundColor = "red";
			}
			else
			{
				document.getElementById("timer").style.backgroundColor = "white";
			}
		}
		el.style.fontSize = "8vw";
		el.style.textAlign = "center";
		el.innerHTML = minutes + ":" + seconds;
		seconds--;
	}, 1000);
}

/**
 * Runs on startup
 */
function init()
{
	updatePage();
	storeUsers();
	slackReader();
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
	matchNumber = doc.elements[2].value;
    willDisplayData = doc.elements[3].checked;

	//updates data on webpage
	updateAllianceColor(eventKey, teamNumber, matchNumber, willDisplayData);
	updateMatchNumber(matchNumber, isBlue(getMatch(getMatches(teamNumber, eventKey, willDisplayData), matchNumber), teamNumber));
	updateMatchSchedule(teamNumber, eventKey, willDisplayData, compareUsingMatchNumber);
	updateRank(teamNumber, eventKey, willDisplayData)
	updateWinLossTie(teamNumber, eventKey, willDisplayData)
	updateTeamMates(teamNumber, eventKey, willDisplayData, matchNumber, isBlue(getMatch(getMatches(teamNumber, eventKey, willDisplayData), matchNumber), teamNumber));
	updateOpponents(teamNumber, eventKey, willDisplayData, matchNumber, isBlue(getMatch(getMatches(teamNumber, eventKey, willDisplayData), matchNumber), teamNumber));
}

//UNDER CONSTRUCTION
function updateValues()
{
	let interval = setInterval(function() {
		//allianceColor(eventKey, teamNumber, matchNumber, willDisplayData);
	}, 30000);
}

/**
 * This function will change the alliance color on the webpage
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {team number in format frc####} teamNumber 
 * @param {match number} matchNumber 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData
 */
function updateAllianceColor(eventKey, teamNumber, matchNumber, willDisplayData)
{
	//Sorts down to the individual match, determines the color, and sets the color on the webpage
	setAllianceColor(isBlue(getMatch(getMatches(teamNumber, eventKey, willDisplayData), matchNumber), teamNumber));
}

/**
 * Returns all the matches for a specific team at a specific event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData
 */
function getMatches(teamNumber, eventKey, willDisplayData)
{
	//Pulls data from TBA in JSON format, turns the JSON data into an array of JS objects
	return JSON.parse(requestData('https://www.thebluealliance.com/api/v3/team/' + teamNumber + '/event/' + eventKey + '/matches', willDisplayData));
}

/**
 * Finds and returns the match data for a given match number from a given set of matches
 * @param {Data to access and look through, usually from getMatches()} data 
 * @param {match number} matchNumber 
 */
function getMatch(data, matchNumber)
{
	return findItem(data, 'match_number', matchNumber);
}

/**
 * Looks through the given data to determine if a given team number is on the blue(true) or red(false) alliance
 * @param {Data to access and look through, usually from getMatch()} data 
 * @param {team number in format frc####} teamNumber 
 */
function isBlue(data, teamNumber)
{
	if (data.alliances.blue.team_keys.includes(teamNumber))
	{
		return true;
	}
	return false;
}

/**
 * Sets the allyColor div to be blue or red depending on the value given
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function setAllianceColor(isBlue)
{
	if (isBlue)
	{
		document.getElementById("allyColor").style.backgroundColor = "blue";
		document.getElementById("allyColor").innerHTML = "<p>Blue</p>";
	}
	else
	{
		document.getElementById("allyColor").style.backgroundColor = "red";
		document.getElementById("allyColor").innerHTML = "<p>Red</p>";
	}
}

/**
 * Updates the match number on the webpage
 * @param {match number} matchNumber 
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function updateMatchNumber(matchNumber, isBlue)
{
	if (isBlue)
	{
		document.getElementById("matchNumber").style.color = "blue";
	}
	else
	{
		document.getElementById("matchNumber").style.color = "red";
	}
	document.getElementById("matchNumber").innerHTML = '<p id="matchNumber">Q' + matchNumber + '</p>'; //adds match number to the HTML
}

/**
 * Returns an array of match numbers for the given event and team number
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getMatchNumbers(teamNumber, eventKey, willDisplayData)
{
	let matchNumbers;
	let data = getMatches(teamNumber, eventKey, willDisplayData); //Gets an array of match objects from TheBlueAlliance
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
function updateTeamMates(teamNumber, eventKey, willDisplayData, matchNumber, isBlue)
{
	document.getElementById("teammates").innerHTML = getTeamMates(teamNumber, eventKey, willDisplayData, matchNumber, isBlue);
}

/**
 * returns an array of teammates for the given event, matchnumber, and alliance color, formats them to remove the "frc" prefix, excluding the given team
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 * @param {Match number} matchNum 
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function getTeamMates(teamNumber, eventKey, willDisplayData, matchNum, isBlue)
{
	let match = getMatch(getMatches(teamNumber, eventKey, willDisplayData), matchNum); //Gets the match object
	
	if (isBlue)
	{
		let teamMates = match.alliances.blue.team_keys; //Grabs the names of the teams on the blue alliance
		return formatTeams(teamMates, teamNumber); //removes "frc" prefix
	}
	else
	{
		let teamMates = match.alliances.red.team_keys; //Grabs the names of the teams on the red alliance
		return formatTeams(teamMates, teamNumber); //removes the "frc" prefix
	}
}

/**
 * Removes the "frc" prefix from the teams, while excluding the given team number from the results if provided
 * @param {Array of team numbers to format} array 
 * @param {OPTIONAL: team to be excluded from results} teamNumber 
 */
function formatTeams(array, teamNumber)
{
	let output = "";

	for (let i = 0; i < array.length; i++)
	{
		//filters out the given team number
		if (array[i] != teamNumber)
		{
			output += array[i].substring(3) + " "; //removes the "frc" prefix
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
function updateOpponents(teamNumber, eventKey, willDisplayData, matchNum, isBlue)
{
	document.getElementById("opponents").innerHTML = getOpponents(teamNumber, eventKey, willDisplayData, matchNum, isBlue);
}

/**
 * returns an array of teammates for the given event, matchnumber, and alliance color, formats them to remove the "frc" prefix, excluding the given team
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 * @param {Match number} matchNum 
 * @param {Boolean. true if blue, false if red} isBlue 
 */
function getOpponents(teamNumber, eventKey, willDisplayData, matchNum, isBlue)
{
	let match = getMatch(getMatches(teamNumber, eventKey, willDisplayData), matchNum)
	
	if (isBlue)
	{
		let opponents = match.alliances.red.team_keys; //Grabs the names of the teams on the red alliance
		return formatTeams(opponents); //removes "frc" prefix
	}
	else
	{
		let opponents = match.alliances.blue.team_keys; //Grabs the names of the teams on the blue alliance
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
function updateRank(teamNumber, eventKey, willDisplayData)
{
	document.getElementById("rank").innerHTML = '<b>Rank:</b> <br><b style="font-size: 8vw">' + getRank(teamNumber, eventKey, willDisplayData) + '</b>';
}

/**
 * Returns the rank of the given team at the given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getRank(teamNumber, eventKey, willDisplayData)
{
	let info = getTeamInfo(teamNumber, eventKey, willDisplayData); //grabs the info for the team
	return info.qual.ranking.rank; //returns only the rank from the team info
}

/**
 * updates the wlt div to display the correct winn/loss/tie record for the given team at the given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function updateWinLossTie(teamNumber, eventKey, willDisplayData)
{
	document.getElementById("wlt").innerHTML = getWinLossTie(getWins(teamNumber, eventKey, willDisplayData), getLosses(teamNumber, eventKey, willDisplayData), getTies(teamNumber, eventKey, willDisplayData)); //updates the html with thewlt record
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
function getWins(teamNumber, eventKey, willDisplayData)
{
	let info = getTeamInfo(teamNumber, eventKey, willDisplayData);
	return info.qual.ranking.record.wins;
}

/**
 * Returns the number of losses for a given team at a given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getLosses(teamNumber, eventKey, willDisplayData)
{
	let info = getTeamInfo(teamNumber, eventKey, willDisplayData);
	return info.qual.ranking.record.losses;
}

/**
 * Returns the number of ties for a given team at a given event
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getTies(teamNumber, eventKey, willDisplayData)
{
	let info = getTeamInfo(teamNumber, eventKey, willDisplayData);
	return info.qual.ranking.record.ties;
}

/**
 * Returns the team info for a given team at a given event in a javascript-readable format
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typically formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAlliance to the console} willDisplayData 
 */
function getTeamInfo(teamNumber, eventKey, willDisplayData)
{
	return JSON.parse(requestData('https://www.thebluealliance.com/api/v3/team/' + teamNumber + '/event/' + eventKey + '/status', willDisplayData)); //parses and return the JSON data recieved
}

/**
 * Requests and returns the data from a given url
 * @param {url} url 
 */
function requestData(url, willDisplayData)
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