
let tasks = [];

let itemMarkupTemplate = 
`<li id="{{taskId}}" class='taskListItem {{isCheckedClass}}'>
  <input class='checkbox' type='checkbox' {{isChecked}}/>
  <span class="contentInfo">{{itemText}}</span>
  <form class="contentEdit" style="display:none"><input type="text" value="" /></form>
  <a class='remove'><i class="fa fa-trash" aria-hidden="true"></i></a>
  <hr>
</li>`;

function createTask(newTaskName){
	tasks.push({
		name: newTaskName,
		done: false,
     	id: 'task_' + Date.now()
    });
    window.localStorage.setItem('tasks', JSON.stringify( tasks ));
    
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
    window.localStorage.setItem('tasks', JSON.stringify( tasks ));
   
};
//updateDom();



$('.add-todos').submit(function(event) {
	event.preventDefault(); 
	let newTaskName = $('#todo-list-item').val();
	$('#todo-list-item').val("");

    createTask(newTaskName);
    window.localStorage.setItem('tasks', JSON.stringify( tasks ));
    
	updateDom();
});


$(document).on('change', '.checkbox', function(){
	
	let taskId = $(this).parent().attr('id');
	let isChecked = $(this).is(':checked');

	for(let i=0; i<tasks.length; i++) {
		if(tasks[i].id === taskId) {
            tasks[i].done = isChecked;
        }
    window.localStorage.setItem('tasks', JSON.stringify( tasks ));
    }
   
	updateDom();
});

$(document).on('dblclick', '.taskListItem', function(){
	$(this).find('.contentInfo').hide();
    $(this).find('.contentEdit').show();
    window.localStorage.setItem('tasks', JSON.stringify( tasks ));
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
        window.localStorage.setItem('tasks', JSON.stringify( tasks ));
        
      }
    updateDom();
 });


$(document).on('click', '.remove', function(){
  let taskId = $(this).parent().attr('id');
  tasks = tasks.filter(function(task){
    return task.id !== taskId;
  });
  window.localStorage.setItem('tasks', JSON.stringify( tasks ));
  updateDom();
});

if(localStorage.getItem('tasks')=== null) {
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

updateDom();

   
    //TODO: Drag and drop change position 
    //TODO: Toggle to show/hide 
    //TODO: Add low medium and high priority 
    //TODO: Add due date to the app 
    //TODO: Add reminder 
    //TODO: Validation 
    //TODO: Use Support realtime data storage: https://www.firebase.com/ 

