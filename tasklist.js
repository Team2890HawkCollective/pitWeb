$(document).ready(function () {
    var i = 0;
    for (i = 0; i <= localStorage.length; i++) {
        
        var taskID = "task-" + i;
        if (localStorage.getItem(taskID) != null) {
            $('#taskList').append("<li id='" + taskID + "'>" + localStorage.getItem(taskID) + "</li>");
        }
        else {
            console.log("No value");
        }
    }
    $('#clear').click(function () {
        localStorage.clear();
    });
    $('#taskEntryForm').submit(function () {
        if ($('#taskInput').val() !== "") {
            var taskID = "task-" + i;
            var taskMessage = $('#taskInput').val();
            localStorage.setItem(taskID, taskMessage);
            $('#taskList').append("<li class='task' id='" + taskID + "'>" + taskMessage + "</li>");
            var task = $('#' + taskID);
            task.css('display', 'none');
            task.slideDown();
            $('#taskInput').val("");
            i++;
        }
        return false;
    });

    $('#taskList').on("click", "li", function (event) {
        self = $(this);
        taskID = self.attr('id');
        localStorage.removeItem(taskID);
        self.slideUp('slow', function () {
            self.remove();
        });

    });


});