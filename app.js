var d = new Date();
document.getElementById("datetime").innerHTML = d.toLocaleString();
let tasks = [];

let itemMarkupTemplate = 
`<li id="{{taskId}}" class='taskListItem {{isCheckedClass}}'>
<input class='checkbox' type='checkbox' {{isChecked}}/>
  <span class="contentInfo">{{itemText}}</span>

  <span class="modal" style="display:none"><span class = "priLeft">{{priority}}</span><span>{{contentEdit}}</span><span class = "dateBottom">{{remideDate}}</span></span>
  
  <a class='remove'><i class="fa fa-trash" aria-hidden="true"></i></a>
  
  <a class = "info"><i id = "myInfo" class="fa fa-info-circle" aria-hidden="true"></i></a>
  <hr>
</li>`;

let currentTaskId = undefined;

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

$(document).on('dblclick', '.taskListItem', function(){
  
	$(this).find('.contentInfo').hide();
  $(this).find('.modal').show();

  
    window.localStorage.setItem('tasks', JSON.stringify( tasks ));
});


$(document).on('click', '.saveBtn', function(event){
    console.log('hello')
    event.preventDefault(); 
  console.log('currentTaskId '+ currentTaskId);
  let newTaskName = $('#editField').val();
  //let newTaskDate = $('#chooseDate').val();
  console.log('newTaskName: ' + newTaskName);
    $(this).find('.modal').val("");
    
    if(newTaskName === '') {
        alert ('Oi! Type something!') 
     } else {
        for(let i=0; i<tasks.length; i++) {
            if(tasks[i].id === currentTaskId) {
              tasks[i].name = newTaskName;
              //tasks[i].dueDate = newTaskDate;
            }
          window.localStorage.setItem('tasks', JSON.stringify( tasks ));
        }
     }
  	
    updateDom();
 });

//start of box model
let btn = document.getElementById("myInfo");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName('close');
 
 $('li #myInfo').click(function(){
    let taskId = $(this).parent().parent().attr('id');
    currentTaskId = taskId;
    console.log('Setting currentTaskId: <' + currentTaskId + '>');
    let taskValue = $(`#${taskId} .contentInfo`).text();
    modal.style.display = "block";
    $('#editField').val(taskValue);
    //$('#chooseDate').val();
 })
 
 $(document).on('click', '.close', function(){
  let taskId = $(this).parent().attr('id'); 
  //let taskId = $(this).parent().parent().attr('id');
    modal.style.display = "none";
 })

//TO DO: to add submit button and update reminder and priority to DOM

//end of box model

$(document).on('click', '.remove', function(){
  let taskId = $(this).parent().attr('id');
  tasks = tasks.filter(task => task.id !== taskId)

  window.localStorage.setItem('tasks', JSON.stringify( tasks ));
  updateDom();
});

