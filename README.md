# pitWeb
A website to display information to the pit crew during a competition

## Table Of Contents
[Installation](#installation)

[Setup](#setup)

## Installation
'git clone https://github.com/Team2890/pitWeb.git'

Place files on web server

Follow [setup](#setup)

**OR**

Navigate [here](https://Team2890HawkCollective.github.io/pitWeb) and follow [setup](#setup)

## Setup
1. Fill in:
    - [TeamNumber](#team-number)
    - [EventKey](#event-key)
    - [SlackAPIKey](#slack-api-key)
    - [SlackChannelID](#slack-channel-id)
    - [TwitchStreamChannelName](#twitch-stream-channel-name)
2. Click the save button

### Team Number
The team number to be used for the [rank](#rank), [schedule](#schedule), [timer](#timer), [win-loss-tie](#win-loss-tie), [colorQ](#colorq), [matchAlerts](#match-alerts), [teammates](#teammates), and [opponents](#opponents)

Formatted as: frc####

### Event Key
The key for the event from [TheBlueAlliance](https://www.thebluealliance.com/events/)

Used for the [rank](#rank), [schedule](#schedule), [timer](#timer), [win-loss-tie](#win-loss-tie), [colorQ](#colorq), [matchAlerts](#match-alerts), [teammates](#teammates), and [opponents](#opponents)

Formatted as: \[year][characters]\

### Slack API Key
The bot user API token of the slack integration for your slack workspace.

**Must use own slack bot with 'incoming-webhook' and 'bot' scopes**

### Slack Channel ID
The id of the slack channel to post messages to

Typically the last characters in numbers in the slack URL

ex: https://YOURWORKSPACE.slack.com/messages/CHANNEL_ID/

### Twitch Stream Channel Name
The channel name for the twitch stream to use for the [video](#video)

### Match Number
**DEBUGGING OPTION**

Allows user to manually set a match number for the [timer](#timer), [colorQ](#colorq), [matchAlerts](#match-alerts), [teammates](#teammates), and [opponents](#opponents)

### Print Requested Data in Console
**DEBUGGING OPTION**

Whether or not to print out the data requested from the blue alliance via the TBA API in the console
