
//находим элементы на страницы
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if(localStorage.getItem('tasks')) {
 
  tasks = JSON.parse(localStorage.getItem('tasks'))
  console.log(tasks)
}

tasks.forEach((task) => renderTask(task))


checkEmptyList();

//Добавление задачи
form.addEventListener("submit", addTask);
// Удаление задачи
tasksList.addEventListener("click", deleteTask);
//Отмечаем задачи завершенной
tasksList.addEventListener("click", doneTask);






// Функции
function addTask(event) {
  //Отменяем отправку формы
  event.preventDefault();

  // Достаем текст задачи из поля ввода
  const taskText = taskInput.value;

  // Описываем задачу в виде обьекта

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  //Добавляем задачу в массив с задачами
  tasks.push(newTask)

  //Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();

  //Рендерим задачу на странице
  renderTask(newTask);

  //Формируем CSS класс
  const cssClass = newTask.done ?  "task-title task-title--done" :  'task-title';

  //Формируем разметку для новой задачи

  const taskHtml = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
   <span class="${cssClass} ">${newTask.text}</span>
   <div class="task-item__buttons">
       <button type="button" data-action="done" class="btn-action">
           <img src="./img/tick.svg" alt="Done" width="18" height="18">
       </button>
       <button type="button" data-action="delete" class="btn-action">
           <img src="./img/cross.svg" alt="Done" width="18" height="18">
       </button>
   </div>
</li>`;

  //Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHtml);
  // Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();
 

  checkEmptyList()
}

function deleteTask(event) {
  // Проверяем если клик был НЕ по кнопке "удалить задачу"
  if (event.target.dataset.action !== "delete") return;
 
 
  const parentNode = event.target.closest(".list-group-item");
  
  //Определяем Id задачи
  const id = Number(parentNode.id);
  
  // удаляем задачу через фильтрацию массива
  tasks = tasks.filter((task) =>  task.id !== id)
  
  //Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();

  //Удаляем задачу из разметки

  parentNode.remove();

  checkEmptyList()
}

function doneTask(event) {
//Проверяем что клик был  НЕ по кнопке "задача выполнена"
 if (event.target.dataset.action !== "done") return
//Проверяем что клик был по кнопке "задача выполнена"
    const parentNode = event.target.closest(".list-group-item");

    const taskTitle = parentNode.querySelector(".task-title");

    taskTitle.classList.toggle("task-title--done");

    //определяем ID задачу
    const id = Number(parentNode.id);

    const task = tasks.find((task) => task.id === id)
    
    task.done = !task.done
    
    //Сохраняем список задач в хранилище браузера LocalStorage
  saveToLocalStorage();
    
 }

function checkEmptyList() {
  if (tasks.length === 0 ) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
    <div class="empty-list__title">Список дел пуст</div>
  </li>`;
  tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
  }

   if (tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null;
  }
 }

 function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
 }

 function renderTask(task) {
 //Формируем CSS класс
 const cssClass = task.done ?  "task-title task-title--done" :  'task-title';

 //Формируем разметку для новой задачи

 const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${cssClass} ">${task.text}</span>
  <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
  </div>
</li>`;

 //Добавляем задачу на страницу
 tasksList.insertAdjacentHTML("beforeend", taskHtml);
 }


 