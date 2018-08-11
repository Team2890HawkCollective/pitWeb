let interval;

function updateTimer()
{
    clearInterval(interval);
    runTimer(1522341600000, getNextMatchTime(1522341600000, teamNumber, eventKey, willDisplayData, matchNumber));                  
}

function runTimer(currentTime, targetTime)
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

        //currentTime = Date.now();
        currentTime += 1000;

        timer.innerHTML = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

        if (difference.getUTCHours == 0)
        {
            if (difference.getUTCMinutes == 0)
            {
                if (difference.getUTCSeconds == 0)
                {
                    clearInterval(interval);
                    updateTimer();
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