//Add a todo
let todoItems = [];

function UpdateDom() {
    let liHtmlList = '';

    for(let item of todoItems){
      let itemHtml = `
        <li class="todo-item" data-key="${item.id}">
           <input id="${item.id}" type="checkbox"/>
           <label for="${item.id}" class="tick js-tick"></label>
           <span>${item.text}</span>
           <button class="delete-todo js-delete-todo">
           <svg><use href="#delete-icon"></use></svg>
          </button>
        </li>`;
  
        liHtmlList += itemHtml;
    }
  
    $('.js-todo-list').html(liHtmlList);      
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);

  UpdateDom();
};

$(document).on('click', '.js-delete-todo', function() {
    $(this).closest(`.todo-item`).remove();
  
  });
UpdateDom();  



const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.form-control');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});
