let interval;

function updateTimer()
{
    clearInterval(interval);
    runTimer((Date.now()), getNextMatchTime());                  
}

function runTimer(currentTime, targetTime)
{
    let timer = document.getElementById("timer");

    let difference;
    let seconds;
    let minutes;
    let hours;

    clearInterval(interval);

    difference = new Date((targetTime) - (currentTime));
    seconds = "0" + difference.getUTCSeconds();
    minutes = "0" + difference.getUTCMinutes();
    hours = difference.getUTCHours();

    timer.innerHTML = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    currentTime += 1000;

    interval = setInterval(function() {
        currentTime = (Date.now());

        difference = new Date((targetTime) - (currentTime));
        seconds = "0" + difference.getUTCSeconds();
        minutes = "0" + difference.getUTCMinutes();
        hours = difference.getUTCHours();

        //hours += getFieldTiming(getPreviousMatch(currentTime));

        timer.innerHTML = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

        console.log(currentTime);
        console.log(targetTime);

        if (difference.getUTCHours() <= 0 && difference.getUTCMinutes() <= 0 && difference.getUTCSeconds() <= 0)
        {
            clearInterval(interval);
            matchNumber = null;
            runTimer((Date.now()), getNextMatchTime()); 
        }

        if (difference.getUTCMinutes() < 1)
        {
            document.getElementById("matchAlert").innerHTML = "Next Match in 1 minute";
            document.getElementById("matchAlert").style.backgroundColor = "red";
        }
        else if (difference.getUTCMinutes() < 5)
        {
            document.getElementById("matchAlert").innerHTML = "Next Match in 5 minutes";
            document.getElementById("matchAlert").style.backgroundColor = "yellow";
        }
        else if (difference.getUTCMinutes() < 10)
        {
            document.getElementById("matchAlert").innerHTML = "Next Match in 10 minutes";
            document.getElementById("matchAlert").style.backgroundColor = "green";
        }
        else
        {
            document.getElementById("matchAlert").innerHTML = "Match";
            document.getElementById("matchAlert").style.backgroundColor = "rgb(62, 65, 65)";
        }

        
    }, 1000);
}

function getNextMatch(currentTime)
{
    let nextMatch;
    if (matchNumber == "null")
    {
        let matches = sortMatches(getMatches());

        for (let a of matches)
        {
            if ((a.time*1000) > currentTime)
            {
                nextMatch = a;
                console.log(nextMatch);
                break;
            }
        }
    }
    else
    {
        localStorage.setItem('matchNumber', null);
        //setStyles();

        nextMatch = getMatch(getMatches());
    }
    return (nextMatch);
}

function getNextMatchTime()
{
    let nextMatchTime = getNextMatch(Date.now() + 1000).time*1000;
    return nextMatchTime;
}


function getPreviousMatch(currentTime)
{
    let matches = sortMatches(JSON.parse(requestData('https://www.thebluealliance.com/api/v3/event/' + eventKey + '/matches', willDisplayData)));
    let previousMatch;

    for (let i = 0; i < matches.length; i++)
    {
        if (matches[i].time > currentTime)
        {
            previousMatch = matches[i - 2];
            break;
        }
    }

    return previousMatch;
}

function sortMatches(matches)
{
    let unsortedMatches = [];
    let sortedMatches = [];

    for (let a of matches)
    {
        if (a.comp_level == "qm")
        {
            unsortedMatches.push(a);
        }
    }

    sortedMatches = mergeSort(unsortedMatches, compareUsingMatchNumberInverse);
    return sortedMatches;
}

function getFieldTiming(previousMatch)
{
    let actualTime  = previousMatch.actual_time;
    let scheduledTime = previousMatch.time;
    return actualTime - scheduledTime;
}