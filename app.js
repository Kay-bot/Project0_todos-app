var d = new Date();
document.getElementById('datetime').innerHTML = d.toLocaleString();

let tasks = [];

let itemMarkupTemplate = 
`<li id="{{taskId}}" class='taskListItem {{isCheckedClass}}'>
<input class='checkbox' type='checkbox' {{isChecked}}/>
  <span class="contentInfo">{{itemText}}</span>

 
  <span class = "priLeft" style: "display: none">{{priority}}</span>
  <span class = "dateBottom" style: "display: none">{{remideDate}}</span>
 
  
  <a class='remove'><i class="fa fa-trash" aria-hidden="true"></i></a>
  
  <a class = "info"><i id = "myInfo" class="fa fa-info-circle" aria-hidden="true"></i></a>
  <hr>
</li>`;

let currentTaskId = undefined;

function createTask(newTaskName){
	tasks.push({
		name: newTaskName,
		done: false,
    id: 'task_' + Date.now(),
    priority: null,
    dueDate: null
    });
   window.localStorage.setItem('tasks', JSON.stringify( tasks ));
    
}
function updateDom() {
    let textEdit = '';

	for (let task of tasks) {

		let liTextEdit = itemMarkupTemplate;
        liTextEdit = liTextEdit.replace('{{taskId}}', task.id);
        liTextEdit = liTextEdit.replace('{{itemText}}', task.name);
        
        
    
    if (task.priority === null) {
      liTextEdit = liTextEdit.replace('{{priority}}', '');
      liTextEdit = liTextEdit.replace('{{remideDate}}', '');
    } 
    else {
      liTextEdit = liTextEdit.replace('{{priority}}', task.priority);
      liTextEdit = liTextEdit.replace('{{remideDate}}',`Due: ${task.dueDate}`);
    }

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
    
    let myText = document.getElementById('empty-state');
    if (tasks.length === 0) {
    myText.style.display = "block";
    }
    else {
    myText.style.display = "none";
    }
    
   window.localStorage.setItem('tasks', JSON.stringify( tasks ));
    
};
  if(localStorage.getItem('tasks')=== null) {
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

updateDom();



$('.add-todos').submit(function(event) {
    let newTaskName = $('#todo-list-item').val();
    $('#todo-list-item').val("");
    
    if(newTaskName === '') {
       alert ('Oi! Type something!') 
    } else {
    createTask(newTaskName);} 
    
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


//start of box model
let save = document.getElementsByClassName("saveBtn");
let infoBtn = document.getElementById("myInfo");
let modal = document.getElementById("myModal");
let closeModal = document.getElementById('close-btn');
 
 $('li #myInfo').click(function(){
    let taskId = $(this).parent().parent().attr('id');
    currentTaskId = taskId;
    let taskValue = $(`#${taskId} .contentInfo`).text();
    let taskDate = $(`#${currentTaskId}.dateBottom`).val();
    let taskPriority = $(`#${currentTaskId}.priLeft`).val();
    $('#editField').val(taskValue);
    $('#chooseDate').val(taskDate);
    $('#selectPriority').val(taskPriority);
    modal.style.display = "block";
 })
 
 $(document).on('click', '.close', function(){
  let taskId = $(this).parent().attr('id'); 
  currentTaskId = taskId;
  modal.style.display = "none";
 })

//TO DO: to add submit button and update reminder and priority to DOM
$(document).on('click', '.submitBtn', function(event){
  event.preventDefault();  
let newTaskName = $('#editField').val();
let newTaskDate = $('#chooseDate').val();
let newTaskPriority = $('#selectPriority').val();
  
  if(newTaskName === '') {
      alert ('Oi! Type something!') 
   } else {
      for(let i=0; i<tasks.length; i++) {
          if(tasks[i].id === currentTaskId) {
            tasks[i].name = newTaskName;
            tasks[i].dueDate = newTaskDate;
            tasks[i].priority = newTaskPriority;
          }
        window.localStorage.setItem('tasks', JSON.stringify( tasks ));
      }
    }
    closeModal.click();
    updateDom();
});

//end of box model

$(document).on('click', '.remove', function(){
  let taskId = $(this).parent().attr('id');
  tasks = tasks.filter(task => task.id !== taskId)
  window.localStorage.setItem('tasks', JSON.stringify( tasks ));
  updateDom();
});

