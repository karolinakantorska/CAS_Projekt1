// style toggler
const styleToggler = document.querySelector('.disp-style').addEventListener('click', () => {
    const cssVariant = document.querySelector('.link_css');
    (/funny/.test(cssVariant.href))
        ? cssVariant.href = 'buisness.css' 
        : cssVariant.href = 'funny.css';  
});
// creating temporary storage or filling creating temporary storage with data from Local storage
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
//const todoList = [];
//window.localStorage.removeItem('todoList');
// reading and compiling List Templates
// rendering any List
const renderList = (list) =>{
    // List Templates
    //reading the templates
    const templateSource = document.getElementById("entry-template").innerHTML;
    // compiling template string into template function 
    const template = Handlebars.compile(templateSource);
    const ulTodoList = document.createElement('ul');
    ulTodoList.setAttribute('class', 'list__container');
    ulTodoList.innerHTML = template(list);
    // TODO should be: removeChild
    document.querySelector('.form__list__container').innerHTML = '';
    document.querySelector('.form__list__container').appendChild(ulTodoList);
    document.querySelector('.list__container').addEventListener('click', handlerEditTask);
}
function handlerEditTask () {
    event.target.classList.contains('edit')
        ? editTask()
        : null;
}

// edit task event
const editTask = function () {
    const liChildrenNodes = event.target.parentElement.children;
    const id =Object.values(liChildrenNodes).find((child) => child.className.includes('id')).innerText;
    // to set placeholder or default text
    const defalutValuesObject = todoList.find((task) => task.id === id);
    const index = todoList.findIndex((task) => task.id === id);
    // deleting Task from todoList
    todoList.splice(index , 2);
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todoList));
    // displaying form for a new task
    handleAddNewTask();
    // filling form with default information
    document.querySelector('.inputTitle').setAttribute('value', `${defalutValuesObject.title}`);
    document.querySelector('.inputDescription').setAttribute('value', `${defalutValuesObject.description}`);
    document.querySelector('.start').setAttribute('value', `${defalutValuesObject.start}`);
    document.querySelector('.finish').setAttribute('value', `${defalutValuesObject.finish}`);
}

// entry form
// rendering an input form
function handleAddNewTask(){
    document.querySelector('.form__list__container').innerHTML = entryForm;
}
const entryForm =  `
    <form class='newTask'>
        <input class='btn_task_input_close' type="button" onclick= "renderList(todoList)" value="&#9747;">
        <span class="title_span">
            <label for="title">Task title: </label>
            <input type="text" name="title" class="inputTitle" required>

        </span>
        <span class="description_span">
            <label for="description">Description: </label>
            <textarea type="text" name="description" class="inputDescription" ></textarea>
        </span>
        <span>
            <input type="radio" class="inputTodo" name="inputTodo" checked >
            <label>Todo</label>
            <input type="radio" class="inputDone" name="inputTodo">
            <label>Done</label>
        </span>
        <span class="date_span">
            <label class="date_label1" for="start" >Start date:<input type="date" class="start" name="inputStart"></label>
            <label class="date_label2" for="finish">Finish date:<input type="date" class="finish" name="inputFinish" ></label>
       </span>
        <span class="stair_rating" onclick= "handleStairRating()">
            <label>Importance:</label>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
        </span>
        <input class='btn_task_input' type="button" value="Add Task" onclick= "addNewTask()">
    </form>
`
// adding event to Add+ 
const newTaskLink = document.querySelector('.link__add').addEventListener('click', handleAddNewTask);
const newTaskBtn = document.querySelector('.btn__add').addEventListener('click', handleAddNewTask );
// adding event to All
const newTaskBtnClose = document.querySelector('#btn__sorting__all').addEventListener('click', () => renderList(todoList));
// adding event to show Done
const doneArray =  todoList.filter((task)=> task.done);
const showDoneBtn = document.querySelector('#btn__sorting__done').addEventListener('click', () => renderList(doneArray));
// adding event to show Todo
const stilTodoArray = todoList.filter((task) => !task.done);
const showTodoBtn = document.querySelector('#btn__sorting__todo').addEventListener('click', () => renderList(stilTodoArray));

// TODO avoid this repetition
function sortTasksFinish() {
    return [...todoList].sort(function(t1,t2){
        return t1.finish - t2.finish;
    });
}
function sortTasksStart() {
    return [...todoList].sort(function (t1, t2) {
        return t1.start - t2.start;
    });
}
function sortTasksImportance() {
    return [...todoList].sort(function (t1, t2) {
        return t1.importance - t2.importance;
    });
}
// TODO shorter functions
function handleSorting() {
    const sortForm = document.querySelector('.sorting_options__radio');
    const sortFormNodes = sortForm.querySelectorAll('input');
    // getting sorting methode
    let value =''
        for (const node of sortFormNodes) {
            (node.checked)
                ? value = node.value
                : null;
        }
    switch (value) {
        case 'finished':
            renderList(sortTasksFinish());
            break;
        case 'start':
            renderList(sortTasksStart());
            break;
        case 'importance':
            renderList(sortTasksImportance());
            break;
    } 
}
// adding event to sort button
const sortBtn = document.querySelector('.btn__sort');
sortBtn.addEventListener('click', handleSorting);

function addNewTask() {
    // TODO try to do it with submit
    //e.preventDefault();
    const id = 'id' + (new Date()).getTime();
    const formNewTask = document.querySelector('.newTask')
    const title = formNewTask.querySelector('.inputTitle').value;
    const description = formNewTask.querySelector('.inputDescription').value;
    const done = formNewTask.querySelector('.inputDone') ? true : false;
    const start = formNewTask.querySelector('.start').value;
    const finish = formNewTask.querySelector('.finish').value;
    const importance = formNewTask.querySelectorAll('.full').length;
    const newTask = {
        id,
        title,
        start,
        finish,
        done,
        description,
        importance,
    }
    todoList.push(newTask);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    formNewTask.reset();
}
const handleStairRating = function (){
    document.querySelector('.stair_rating').addEventListener('click', stairRating);
}
// TODO ask why du I have to click twice
const stairRating = function () {
    event.target.classList.contains('rating-star')
        ? addClassToStairs(event.target)
        : null;
}
function addClassToStairs(node) {
    const parentsChildren = node.parentElement.children
    const parentsChildrenArray = Object.values(parentsChildren).filter((child) => child.classList.contains('rating-star'))
    const nodeIndex = parentsChildrenArray.indexOf(node)
    parentsChildrenArray.forEach((child, index) => {
        (index <= nodeIndex)
            ? child.classList.add('full')
            : child.classList.remove('full')
    })
}

// TODO sorting functions better
// TODO showing todolist when the website opens





