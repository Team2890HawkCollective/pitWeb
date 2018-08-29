/***********************************************
 * Team Profile JS
 */
//This controls the image slide show
function openImage(evt, imageName) {
    var i, tabcontent, tablinks;
   
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
   
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //This displays the block image
    document.getElementById(imageName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

/***********************************************
 * Game LiveStream JS
 */

 //This changes the channel ID for the twitch player
 function changeChannelID()
 {
     let newid = document.getElementById("modaltwitchform").elements[0].value;
     document.getElementById("twitchplayer").src= "https://player.twitch.tv/?channel=" + newid;
 }

 