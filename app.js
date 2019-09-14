let tasks = [];

let itemMarkupTemplate = 
`<li id="{{taskId}}" class='taskListItem {{isCheckedClass}}'>
  <input class='checkbox' type='checkbox' {{isChecked}}/>
  <span class="contentInfo">{{itemText}}</span>
  <form class="contentEdit" style="display:none"><input type="text" value="" /></form>
  <a class='remove'>x</a>
  <hr>
</li>`;

function createTask(newTaskName){
	tasks.push({
		name: newTaskName,
		done: false,
     	id: 'task_' + Date.now()
	});
}

function updateDom() {
	let textEdit = '';

	for (let task of tasks) {

		let liTextEdit = itemMarkupTemplate;
    liTextEdit = liTextEdit.replace('{{taskId}}', task.id);
		liTextEdit = liTextEdit.replace('{{itemText}}', task.name);

		if(task.done){
			liTextEdit = liTextEdit.replace('{{isChecked}}', 'checked');
			liTextEdit = liTextEdit.replace('{{isCheckedClass}}', 'completed');
		}
		else {
			liTextEdit = liTextEdit.replace('{{isChecked}}', '');
			liTextEdit = liTextEdit.replace('{{isCheckedClass}}', '');
		}
			
		textEdit += liTextEdit;
	}
	$('#todos-list').html(textEdit);

};
updateDom();


$('.add-todos').submit(function(event) {
	event.preventDefault(); 

	let newTaskName = $('#todo-list-item').val();
	$('#todo-list-item').val("");

	createTask(newTaskName);
	updateDom();
});


$(document).on('change', '.checkbox', function(){
	
	let taskId = $(this).parent().attr('id');
	let isChecked = $(this).is(':checked');

	for(let i=0; i<tasks.length; i++) {
		if(tasks[i].id === taskId) {
			tasks[i].done = isChecked;
		}
	}
	updateDom();
});

$(document).on('dblclick', '.taskListItem', function(){
	let taskId = $(this).attr('id');
	$(this).find('.contentInfo').hide();
	$(this).find('.contentEdit').show();
});

$(document).on('submit', '.contentEdit', function(event){
	event.preventDefault(); 
	let taskId = $(this).parent().attr('id');

	let newTaskName = $(this).find('input').val();
  $(this).find('input').val("");

  	for(let i=0; i<tasks.length; i++) {
		  if(tasks[i].id === taskId) {
		    tasks[i].name = newTaskName;
		  }
	  }
    updateDom();
 });

updateDom();


$(document).on('click', '.remove', function(){
  let taskId = $(this).parent().attr('id');
  tasks = tasks.filter(function(task){
    return task.id !== taskId;
  });
  updateDom();
});

   
    //TODO: Drag and drop change position 
    //TODO: Toggle to show/hide 
    //TODO: Add low medium and high priority 
    //TODO: Add due date to the app 
    //TODO: Add reminder 
    //TODO: Validation 
    //TODO: Use Support realtime data storage: https://www.firebase.com/ 

