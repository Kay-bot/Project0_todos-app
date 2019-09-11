$(document).ready(function () {
     
    $('#todos-list').html(localStorage.getItem('listTodos'));
       
    $('.add-todos').submit(function(event) {
      event.preventDefault();

      var item = $('#todo-list-item').val();
      if(item) {
        $('#todos-list').append("<li><input class='checkbox' type='checkbox'/>" + item +"<a class='remove'>x</a><hr></li>");
        localStorage.setItem('listTodos', $('#todos-list').html());
        $('#todo-list-item').val("");

      }
    });
  
    $(document).on('change','.checkbox',function(){
      if($(this).attr('checked')){
        $(this).removeAttr('checked');
      }else{
        $(this).attr('checked','checked');
      }
      $(this).parent().toggleClass('completed');
      localStorage.setItem('listTodos', $('#todos-list').html());
    });

    $(document).on('click','.remove',function(){
      $(this).parent().remove();
      localStorage.setItem('listTodos', $('#todos-list').html());
    });
  });
    //TODO: Use Support realtime data storage: https://www.firebase.com/ 
    //TODO: Drag and drop change position 
    //TODO: Toggle to show/hide 
    //TODO: DB-click the list to edit the todo
    //TODO: Add low medium and high priority 
    //TODO: Add due date to the app 
    //TODO: Add reminder 
    

    