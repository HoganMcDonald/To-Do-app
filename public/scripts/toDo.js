//on page load
$(document).ready(function() {
  console.log('JQJS');
  getList();
  //submit button click function
  $('.submit').on('click', addToList);
});

//add to list funciton
function addToList() {
  console.log('button clicked');
  var requestObject = {
    task: $('.task').val(),
    notes: $('.notes').val()
  };
  console.log(requestObject);
} //end add to list

//get list function
function getList() {
  $.ajax({
    type: 'GET',
    url: '/getList',
    success: function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var $div = $('<div>');
        $div.addClass('taskItem');
        $div.append('<h3>Task:</h3>' + response[i].task);
        $div.append('<h3>Notes:</h3>' + response[i].notes);
        $('.display').append($div);
      }
    }
  });
} //end get list
