let interval;

function updateTimer()
{
    clearInterval(interval);
    runTimer(Date.now(), getNextMatchTime(Date.now(), teamNumber, eventKey, willDisplayData, matchNumber));                  
}

function runTimer(currentTime, targetTime, teamNumber, eventKey, willDisplayData)
{
    let timer = document.getElementById("timer");

    let difference;
    let seconds;
    let minutes;
    let hours;

    difference = new Date((targetTime) - (currentTime));
    seconds = "0" + difference.getUTCSeconds();
    minutes = "0" + difference.getUTCMinutes();
    hours = difference.getUTCHours();

    timer.innerHTML = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    currentTime++;

    interval = setInterval(function() {
        difference = new Date((targetTime) - (currentTime));
        seconds = "0" + difference.getUTCSeconds();
        minutes = "0" + difference.getUTCMinutes();
        hours = difference.getUTCHours();

        hours += getFieldTiming(getPreviousMatch(currentTime, teamNumber, eventKey, willDisplayData));

        currentTime = Date.now();

        timer.innerHTML = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

        if (difference.getUTCHours == 0)
        {
            if (difference.getUTCMinutes == 0)
            {
                if (difference.getUTCSeconds == 0)
                {
                    clearInterval(interval);
                    updateTimer();
                    updatePage();
                }
            }
        }
    }, 1000);
}

function getNextMatchTime(currentTime, teamNumber, eventKey, willDisplayData, matchNumber)
{
    return getNextMatch(currentTime, teamNumber, eventKey, willDisplayData, matchNumber).time*1000;
}

function getNextMatch(currentTime, teamNumber, eventKey, willDisplayData, matchNumber)
{
    if (matchNumber == "null")
    {
        let matches = getMatches(teamNumber, eventKey, willDisplayData);
        let nextMatch;

        for (let a of matches)
        {
            if ((a.time*1000) > currentTime)
            {
                nextMatch = a;
                break;
            }
        }

        return nextMatch;
    }
    else
    {
        localStorage.setItem('matchNumber', null);
        setStyles();

        let nextMatch;
        nextMatch = getMatch(getMatches(teamNumber, eventKey, willDisplayData), matchNumber);

        return nextMatch;
    }
}

function getPreviousMatch(currentTime, teamNumber, eventKey, willDisplayData)
{
    let matches = getMatches(teamNumber, eventKey, willDisplayData);
    let previousMatch;

    for (let i = 0; i < matches.length; i++)
    {
        if ((matches[i].time*1000) > currentTime)
        {
            previousMatch = matches[i - 2];
            break;
        }
    }

    return previousMatch;
}

function getFieldTiming(previousMatch)
{
    let actualTime  = previousMatch.actual_time;
    let scheduledTime = previousMatch.time;
    return actualTime - scheduledTime;
}