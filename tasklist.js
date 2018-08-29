$(document).ready(function () {
  var i = 0;
  for (i = 0; i < localStorage.length; i++) {
      var taskID = i;
      $('#taskList').append("<li id='" + taskID + "'>" + localStorage.getItem(taskID) + "</li>");
  }
  $('#taskEntryForm').submit(function () {
      if ($('#taskInput').val() !== "") {
          var taskID = i;
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

