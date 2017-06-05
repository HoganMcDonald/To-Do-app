//on page load
$(document).ready(function() {
  console.log('JQJS');
  getList();
  //submit button click function
  $('.submit').on('click', addToList);
  $('.display').on('click', '.deleteButton', removeFromList);
});

//add to list funciton
function addToList() {
  console.log('button clicked');
  var requestObject = {
    task: $('.task').val(),
    notes: $('.notes').val()
  };
  console.log(requestObject);
  $.ajax({
    type: 'POST',
    url: 'addList',
    data: requestObject,
    success: getList
  });
  $('.task').val('');
  $('.notes').val('');
} //end add to list

//remove from list function
function removeFromList() {
  var requestObject = {
    id: $(this).siblings('.key').text()
  };
  $.ajax({
    type: 'DELETE',
    url: '/removeList',
    data: requestObject,
    success: getList
  }); //end ajax

} //end remove from list

//get list function
function getList() {
  $('.display').empty();
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
        $div.append('<p class="key">' + response[i].id);
        $div.append('<button class="doneButton">Done</div>');
        $div.append('<button class="deleteButton">Delete</div>');
        $('.display').append($div);
      } //end loop
    } //end success function
  }); //end ajax
} //end get list
