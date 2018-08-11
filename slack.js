let userList;
let messageList;

function slackReader()
{
    let socket; 
    messageList = [];
    $.ajax({
		url: "https://slack.com/api/rtm.connect?token=" + slackAPI, //Url for the rtm api. returns a websocket url
		success: function(data) {
            socket = new WebSocket(data.url); //opens a new websocket to access the slack messages
            
            // Listen for messages
            socket.addEventListener('message', function (event) {
                let messageData = JSON.parse(event.data); //message data
                
                //Is the event a message
                if (messageData.type == "message") {
                    let text = messageData.text; //text of message
                    let name;

                    //Only bot user messages have a "username" property. Determines if message originates from bot
                    if ("username" in messageData)
                    {
                        name = messageData.username;
                    }
                    else //Not a bot message
                    {
                        //Run through array of users, to find the username of the message
                        for (let user of userList)
                        {
                            //if id of the user i'm looking at is the same as the id of the message, set the name to that user's name
                            if (user.id == messageData.user)
                            {
                                name = user.name;
                                break;
                            }
                        }
                    }

                    //Adds the message to the array of messages
                    messageList.push(name + ": " + text);

                    //only show the 8 most recent messages
                    while (messageList.length > 8)
                    {
                        messageList.shift(); //removes the oldest message
                    }

                    document.getElementById("alertBox").innerHTML = ""; //clears the chat before refilling
                    
                    //Run through the array of messages and re-populate the chat
                    for (let b of messageList)
                    {
                        document.getElementById("alertBox").innerHTML += (b + "<br>");
                    }
                }
            });
        }
    });
}

/**
 * Builds an array of objects holding a user's id and their name
 */
function storeUsers()
{
	$.ajax({
		url: "https://slack.com/api/users.list?token=" + slackAPI,
		async: false,
		type: "GET",
		success: function(data) {
			userList = [];
            let users = JSON.parse(JSON.stringify(data)).members; //Grabs the list of members

            //Runs through the list of users to build an array of objects holding the name and is
			for (let i = 0; i < users.length; i++)
			{
                //Create an object holding an id and a name and add it to the userList array;
                //if user is a bot, use the bot_id property
                if ("bot_id" in users[i].profile)
                {
                    userList[i] = {"id": users[i].profile.bot_id, "name": users[i].real_name};
                }
                else //else, use the id property
                {
                    userList[i] = {"id": users[i].id, "name": users[i].real_name};
                }
			}
		}
	});

}

/**
 * Send a message to the slack channel
 */
function sendMessage()
{
    let message = document.getElementById("messageForm").elements[0].value; //Grab the text of the message from the form
    //Send the message
    $.ajax({
        type: "POST",
        url: "https://slack.com/api/chat.postMessage?token=" + slackAPI + "&channel=CC4GK41U1&text=" + message
    })
}