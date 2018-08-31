# pitWeb
A website to display information to the pit crew during a competition

## Table Of Contents
[Installation](#Installation)

[PageList](#page-list)

[Setup](#setup)

## Installation
'git clone https://github.com/Team2890/pitWeb.git'

Place files on web server

**OR**

Navigate [here](https://team2890.github.io/pitWeb) and follow [setup](#setup)

## Page List

[Home](#home)

[Alerts](#alerts)

[Clock](#clock)

~~[Notepad](#notepad)~~

[Photos](#photos)

~~[References](#references)~~

~~[ScoutingApp](#scouting-app)~~

[GameLivestream](#game-livestream)

[Settings](#settings)

## Pages

### Home
Main page where the most important information for the pit crew is displayed

#### Page Elements
[AlertsBar](#alerts-bar)

[Video](#video)

[Timer](#timer)

~~[Top5](#top-5)~~

[Rank](#rank)

[ColorQ#](#colorq)

### Alerts
Used to send and read Discord and Slack messages, know what and when the next match is, and add/delete items from a task list

#### Page Elements
[Slack](#slack)

[TaskList](#task-list)

[Discord](#discord)

[Timer](#timer)

[ColorQ#](#colorq)

### Clock
Shows the most important information pertaining to the team's standings and the next match

#### Page Elements
[AlertsBar](#alerts-bar)

[ColorQ#](#colorq)

[Timer](#timer)

[Teammates](#teammates)

[Opponents](#opponents)

[Rank](#rank)

[WinLossTie](#win-loss-tie)

[Schedule](#schedule)

### Notepad
Not currently working

### Photos
Shows a slideshow of pictures about Team2890

#### Page Elements
[AlertsBar](#alerts-bar)

[PictureSlideshow](#picture-slideshow)

### References
Not currently working

### Scouting App
Not curently working

### Game Livestream
Shows a near-fullscreen view of the livestream of the event

#### Page Elements
[AlertsBar](#alerts-bar)

[Video](#video)

### Settings
This is where you change all the settings to get the page working. Settings transfer across pages and on page refresh

Settings include: 
- [TeamNumber](#team-number)
- [EventKey](#event-key)
- [SlackAPIKey](#slack-api-key)
- [SlackChannelID](#slack-channel-id)
- [TwitchStreamChannelName](#twitch-stream-channel-name)
- **DEBUGGING OPTIONS**
- [MatchNumber](#match-number)
- [PrintRequestedDataInConsole](#print-requested-data-in-console)

### Settings Elements

#### Team Number
The team number to be used for the [rank](#rank), [schedule](#schedule), [timer](#timer), [win-loss-tie](#win-loss-tie), [colorQ](#colorq), [matchAlerts](#match-alerts), [teammates](#teammates), and [opponents](#opponents)

Formatted as: frc####

#### Event Key
The key for the event from [TheBlueAlliance](https://www.thebluealliance.com/events/)

Used for the [rank](#rank), [schedule](#schedule), [timer](#timer), [win-loss-tie](#win-loss-tie), [colorQ](#colorq), [matchAlerts](#match-alerts), [teammates](#teammates), and [opponents](#opponents)

Formatted as: \[year][characters]\

#### Slack API Key
The bot user API token of the slack integration for your slack workspace.

**Must use own slack bot with 'incoming-webhook' and 'bot' scopes**

#### Slack Channel ID
The id of the slack channel to post messages to

Typically the last characters in numbers in the slack URL

ex: https://YOURWORKSPACE.slack.com/messages/CHANNEL_ID/

#### Twitch Stream Channel Name
The channel name for the twitch stream to use for the [video](#video)

#### Match Number
**DEBUGGING OPTION**

Allows user to manually set a match number for the [timer](#timer), [colorQ](#colorq), [matchAlerts](#match-alerts), [teammates](#teammates), and [opponents](#opponents)

#### Print Requested Data in Console
**DEBUGGING OPTION**

Whether or not to print out the data requested from the blue alliance via the TBA API in the console

## Elements on Pages

#### Alerts Bar
Displays alerts when something important happens

[Slack](#slack-alerts)

[Match](#match-alerts)

~~[Discord](#discord-alerts)~~

##### Slack Alerts
Displays messages sent in the channel designated in the [SlackChannelID](#slack-channel-id) field in [settings](#settings).
Messages are only displayed if they contain '!important!' at the beginning.

Colors alternate between ![#FF1493](https://placehold.it/15/FF1493/000000?text=+) Deep Pink and ![#00FFFF](https://placehold.it/15/00FFFF/000000?text=+) Cyan

##### Match Alerts
Displays when a match is 10 minutes, 5 minutes away, and 1 minute away. 

Match is determines based on the team specified in the [TeamNumber](#team-number) field at the specified [EventKey](#event-key) field in [settings](#settings)

Match can be manually set in the [MatchNumber](#match-number) field in [settings](#settings)

Changes color from ![#008000](https://placehold.it/15/008000/000000?text=+) Green, ![#FFFF00](https://placehold.it/15/FFFF00/000000?text=+) Yellow, and ![#FF0000](https://placehold.it/15/FF0000/000000?text=+) Red.

##### Discord Alerts
Not currently working

#### Picture Slideshow
Shows the currently selected image and the list of available images to view on the left

#### Video
Displays the twitch stream from the [TwitchStreamChannelName](#twitch-stream-channel-name) field in [settings](#setting)

#### Slack
Allows the user to post messages and view messages from the slack channel specified in the [SlackChannelID](slack-channel-id) field in [settings](#settings)

#### Task List
Allows user to add and remove tasks, and clear all the tasks. Tasks stay even when page is refreshed

#### Discord
Allows the user to post messages, view messages, and switch channels on the Hawk COllective discord **ONLY**

**CURRENTLY NOT CONFIGURABLE**

#### Timer
Displays the time till the next match. 

Match can be manually set in the [MatchNumber](#match-number) field in [settings](#settings)

#### Teammates
Displays the teammates for the next match for the team specified in the [TeamNumber](#team-number) field at the specified [EventKey](#event-key) field in [settings](#settings)

Match can be manually set in the [MatchNumber](#match-number) field in [settings](#settings)

Changes color from ![#0000FF](https://placehold.it/15/0000FF/000000?text=+) Blue and ![#FF0000](https://placehold.it/15/FF0000/000000?text=+) Red  based on the alliance color

#### Opponents
Displays the opponents for the next match for the team specified in the [TeamNumber](#team-number) field at the specified [EventKey](#event-key) field in [settings](#settings)

Match can be manually set in the [MatchNumber](#match-number) field in [settings](#settings)

Changes color from ![#0000FF](https://placehold.it/15/0000FF/000000?text=+) Blue and ![#FF0000](https://placehold.it/15/FF0000/000000?text=+) Red based on the alliance color

#### Top 5
Not currently working

#### Rank
Shows the current rank of the team specified in the [TeamNumber](#team-number) field at the specified [EventKey](#event-key) field in [settings](#settings)

#### Win Loss Tie
Displays the current Wins/Losses/Ties for the team specified in the [TeamNumber](#team-number) field at the specified [EventKey](#event-key) field in [settings](#settings)

#### Schedule
Displays the schedule for matches for the team specified in the [TeamNumber](#team-number) field at the specified [EventKey](#event-key) field in [settings](#settings)

Schedule is formatted as:
- Time (DoW hh:mm)
- Match #
- Blue 1
- Blue 2
- Blue 3
- Red 1
- Red 2
- Red 3

The team is highlighted in either ![#0000FF](https://placehold.it/15/0000FF/000000?text=+) Blue or ![#FF0000](https://placehold.it/15/FF0000/000000?text=+) Red based on their alliance

#### ColorQ#
Displays the next match for the team specified in the [TeamNumber](#team-number) field at the specified [EventKey](#event-key) field in [settings](#settings)

Match can be manually set in the [MatchNumber](#match-number) field in [settings](#settings)

Changes color from ![#0000FF](https://placehold.it/15/0000FF/000000?text=+) Blue and ![#FF0000](https://placehold.it/15/FF0000/000000?text=+) Red  based on the alliance color

## Setup
1. Fill in:
    - [TeamNumber](#team-number)
    - [EventKey](#event-key)
    - [SlackAPIKey](#slack-api-key)
    - [SlackChannelID](#slack-channel-id)
    - [TwitchStreamChannelName](#twitch-stream-channel-name)
2. Click the save button

