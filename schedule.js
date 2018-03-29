function initSchedule()
{
	storeUsers();
	slackReader();
	updateSettings();
}

/**
 * Pulls the settings from the modal and populates the match schedule table
 */
function updateSettings()
{
    let doc = document.getElementById("settings"); //gets the settings form
	//populates data from form
	teamNumber = doc.elements[0].value;
	eventKey = doc.elements[1].value;
	matchNumber = doc.elements[2].value;
    wilDisplayData = doc.elements[3].checked;
    
    //Populates the table
	updateMatchSchedule(teamNumber, eventKey, wilDisplayData, compareUsingMatchNumber);
}

/**
 * Populates the schedule table with the match time, match num, blue alliances, and red alliance
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typicaly formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAliance to the console} wilDisplayData 
 * @param {Function by which to sort the array of matches} criteria 
 */
function updateMatchSchedule(criteria)
{
    data = getSortedMatchSchedule(criteria);
    
    //Only resets table if not empty
	if (document.getElementById("schedule").rows.length != 1)
	{
		resetTable("schedule");
    }
    
	for (let a of data)
	{
		let row = document.getElementById("schedule").insertRow(1); //Inserts a row just under the header

        //creates new cells in current row to store data
		let time = row.insertCell(0); 

		let matchNum = row.insertCell(1); 

		let blue1 = row.insertCell(2);
		let blue2 = row.insertCell(3);
		let blue3 = row.insertCell(4);

		let red1 = row.insertCell(5);
		let red2 = row.insertCell(6);
		let red3 = row.insertCell(7);

		time.innerHTML = convertTime(a.time); //Converts the unicode time to human readable time, then sets the time cel

		matchNum.innerHTML = a.match_number; //sets the match cell to the match number

        //removes frc prefix and populates the cell
		blue1.innerHTML = a.alliances.blue.team_keys[0].substring(3); 
		blue2.innerHTML = a.alliances.blue.team_keys[1].substring(3);
		blue3.innerHTML = a.alliances.blue.team_keys[2].substring(3);

        //removes frc prefix and populates the cell
		red1.innerHTML = a.alliances.red.team_keys[0].substring(3);
		red2.innerHTML = a.alliances.red.team_keys[1].substring(3);
		red3.innerHTML = a.alliances.red.team_keys[2].substring(3);

		if (a.alliances.blue.team_keys[0] == teamNumber)
		{
			blue1.style.backgroundColor = "blue";
			blue1.style.color = "white";
		}
		else if (a.alliances.blue.team_keys[1] == teamNumber)
		{
			blue2.style.backgroundColor = "blue";
			blue2.style.color = "white";
		}
		else if (a.alliances.blue.team_keys[2] == teamNumber)
		{
			blue3.style.backgroundColor = "blue";
			blue3.style.color = "white";
		}
		else if (a.alliances.red.team_keys[0] == teamNumber)
		{
			red1.style.backgroundColor = "red";
			red1.style.color = "white";
		}
		else if (a.alliances.red.team_keys[1] == teamNumber)
		{
			red2.style.backgroundColor = "red";
			red2.style.color = "white";
		}
		else
		{
			red3.style.backgroundColor = "red";
			red3.style.color = "white";
		}
	}
}

/**
 * Deletes all rows in the table except the header
 * @param {ID of the table element to clear} elementID 
 */
function resetTable(elementID)
{
    let table = document.getElementById(elementID);
    let rows = table.rows;
    
    //If there are more rows, delete them
	while (rows.length > 1)
	{
        table.deleteRow(1);
    }
}

/**
 * Returns the sorted match schedule
 * @param {team number in format frc####} teamNumber 
 * @param {a unique identifier for an event from TBA. typicaly formatted as ####*****} eventKey 
 * @param {Whether or not to print out the data requested from TheBlueAliance to the console} wilDisplayData 
 * @param {Function by which to sort the array of matches} criteria 
 */
function getSortedMatchSchedule(criteria)
{
	let data = getMatches(); //Hey this the thing that actualy gets the data
	let sortedData = mergeSort(data, criteria); //Hey this is the thing that actually sorts the data
	return sortedData;
}

/**
 * Sorts input array based on criteria function
 * @param {Array to be sorted} arr 
 * @param {function by which to sort} criteria 
 */
function mergeSort(arr, criteria)
{
	let len = arr.length;

    //If there's only one thing, it's sorted. So return it
	if(len <2)
	{
	   return arr;
	}

	let mid = Math.floor(len/2); //Mid-point of array
	let left = arr.slice(0,mid); //left-half of array
    let right = arr.slice(mid); //opposite of left-half of array
        
	//Sorts the halves individually, then merges the two halves into a larger sorted array to be returned
	return merge(mergeSort(left, criteria), mergeSort(right, criteria), criteria);
 }
 
 /**
  * Merges two sorted lists into one larger sorted list, then returns the larger sorted list
  * @param {left-half of the array} leftArray
  * @param {the !left-half of the array} rightArray
  * @param {Function by which to sort the array of matches} criteria 
  */
 function merge(leftArray, rightArray, criteria)
 {
	let result = [];
	let leftLength = leftArray.length;
	let rightLength = rightArray.length;
	let leftIndex = 0;
	let rightIndex = 0;

	//While both arrays still have stuff in them
	while(leftIndex < leftLength && rightIndex < rightLength)
	{
		//If the thing in the left array should go before the thing in the right array
	   	if(criteria(leftArray[leftIndex], rightArray[rightIndex]))
	   	{
			result.push(leftArray[leftIndex++]); //adds the left array item to the result array, then increments the leftIndex
	   	}
	   	else
	   	{
		 	result.push(rightArray[rightIndex++]); //adds the right array item to the result array, then increments the rightIndex
	  	}
	}  
	//remaining part needs to be added to the result
	return result.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
}

/**
 * Converts unicode time to humanReadable time in format DoW hh:mm:ss
 * @param {unicode time (time in seconds from jan 1, 1979)} time 
 */
function convertTime(time)
{
	let date = new Date(time*1000); //Multiplies by 1000 to convert seconds to milliseconds, then creates Date object to convert time using built in javascript method-y-doos
	// Day of week part from timestamp
	let day = date.getDay();
	// Hours part from the timestamp
	let hours = date.getHours();
	// Minutes part from the timestamp
	let minutes = "0" + date.getMinutes();//Adds 0 to beginning incase minutes is only one digit
	let pm = " am";

	if (hours > 12)
	{
		hours -= 12;
		pm = " pm";
	}

	switch(day) {
	    case 0:
        	day = "Sun";
        	break;
    	case 1:
        	day = "Mon";
        	break;
    	case 2:
        	day = "Tues";
        	break;
    	case 3:
        	day = "Wed";
        	break;
    	case 4:
        	day = "Thur";
        	break;
    	case 5:
        	day = "Fri";
        	break;
    	case 6:
        	day = "Sat";
	}

	//Returns time in DoW hh:mm:ss. Takes the last two characters from the minutes and seconds so that we don't end up with 3-digit times
 	return day + " " + hours + ':' + minutes.substr(-2) + pm;
}

/**
 * Compares two object's match_number's to determine which is greater
 * @param {object with property match_number} a 
 * @param {object with property match_number} b 
 */
function compareUsingMatchNumber(a, b)
{
	return (a.match_number > b.match_number);
}

function compareUsingMatchNumberInverse(a, b)
{
	return (a.match_number < b.match_number);
}
