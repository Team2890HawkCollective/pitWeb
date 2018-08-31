$(document).ready(function () {
    var i = 7;
    var k = localStorage.length; 
    console.log(localStorage.length);
    for (l = 7; l < k; l++) {
        var taskID = "task-" + (l);
        if (localStorage.getItem(taskID) != null) {
            $('#taskList').append("<li id='" + taskID + "'>" + localStorage.getItem(taskID) + "</li>");
            console.log("Value of l:" + l);
        }
        else {
            k = k +1;
        }
    }

    $('#clear').click(function () {
            /*    self = $(this);
            taskID = self.attr('id');
            localStorage.removeItem(taskID);
            self.slideUp('slow', function () {
                self.remove();
            }); */
        $(".todolistul").remove();
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