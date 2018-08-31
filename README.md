# pitWeb
A website to display information to the pit crew during a competition

## Table Of Contents
[Installation](#Installation)

## Installation
'git clone https://github.com/Team2890/pitWeb.git'

Place files on web server

**OR**

Navigate [here](https://github.com/Team2890/pitWeb) and follow [Usage](#Usage)

## Usage

### Page List

[Home](#home)

[Alerts](#alerts)

[Clock](#clock)

~~[Notepad](#notepad)~~

[Photos](#photos)

~~[References](#references)~~

~~[ScoutingApp](#scoutingApp)~~

[GameLivestream](#gameLivestream)

[Settings](#settings)

### Home
Main page where the most important information for the pit crew is displayed

#### Page Elements
[AlertsBar](#alertsBar)

[Video](#video)

[Timer](#timer)

~~[Top5](#top5)~~

[Rank](#rank)

[ColorQ#](#colorQ#)

#### Alerts Bar
[Slack](#slackAlerts)

[Match](#MatchAlerts)

~~[Discord](#DiscordAlerts)~~

##### Slack Alerts
Displays messages sent in the channel designated in the [Slack Channel ID](#Slack Channel ID) if they have '!important!' at the beginning.

Colors alternate between ![#FF1493](https://placehold.it/15/FF1493/000000?text=+) Deep Pink and ![#00FFFF](https://placehold.it/15/00FFFF/000000?text=+) Cyan

##### Match Alerts
Displays when a match is 10 minutes, 5 minutes away, and 1 minute away. 

Changes color from ![#008000](https://placehold.it/15/008000/000000?text=+) Green, ![#FFFF00](https://placehold.it/15/FFFF00/000000?text=+) Yellow, and ![#FF0000](https://placehold.it/15/FF0000/000000?text=+) Red.

##### Discord Alerts
Not currently working

#### Video
Displays the twitch stream from the [Twitch Stream Channel Name](#Twitch Stream Channel Name) field in the settings

#### Timer
Displays the time till the next match. Match can be manually set in the [Match Number](#Match Number) field in the settings