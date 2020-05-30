// style toggler
const styleToggler = document.querySelector('.disp-style').addEventListener('click', () => {
    const cssVariant = document.querySelector('.link_css');
    (/funny/.test(cssVariant.href))
        ? cssVariant.href = 'buisness.css' 
        : cssVariant.href = 'funny.css';  
});
// creating temporary storage or filling creating temporary storage with data from Local storage
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
console.log(JSON.parse(localStorage.getItem('todoList')));

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
}
function handleRenderList(){

}

// TODO delete when I know what to do with inline event
function renderTodoList(){
    // List Templates
    //reading the templates
    const templateSource = document.getElementById("entry-template").innerHTML;
    // compiling template string into template function 
    const template = Handlebars.compile(templateSource);
    const ulTodoList = document.createElement('ul');
    ulTodoList.setAttribute('class', 'list__container');
    ulTodoList.innerHTML = template(todoList);
    // TODO should be: removeChild
    document.querySelector('.form__list__container').innerHTML= '';
    document.querySelector('.form__list__container').appendChild(ulTodoList);
}


// entry form
const entryForm = `
    <form class='newTask'>
        <input class='btn_task_input_close' type="button" onclick= "renderTodoList()" value="&#9747;">
        <span>
            <label for="title">Task title: </label>
            <input type="text" name="title" class="inputTitle" required>
        </span>
        <span>
            <label for="description">Description: </label>
            <input type="text" name="description" class="inputDescription">
        </span>
        <span>
            <input type="radio" class="inputTodo" name="inputTodo" hecked>
            <label>Todo</label>
            <input type="radio" class="inputDone" name="inputTodo">
            <label>Done</label>
        </span>
        <span>
            <label for="start">Start date:</label>
            <input type="date" class="start" name="inputStart">
            <label for="finish">Finish date:</label>
            <input type="date" class="finish" name="inputFinish">
       </span>
        <span class="stair_rating">
            <label>Importance:</label>
            <span class="rating-star rating-star-full" role="button" value='1'>&#9734;</span>
            <span class="rating-star rating-star-full" role="button" value='2'>&#9734;</span>
            <span class="rating-star rating-star-full" role="button" value='3'>&#9734;</span>
            <span class="rating-star" role="button" value='4'>&#9734;</span>
            <span class="rating-star" role="button" value='5'>&#9734;</span>
        </span>
        <input class='btn_task_input' type="button" value="Add Task" onclick= "addNewTask()">
        
    </form>
`
// event Add+
function handleAddNewTask(){
    document.querySelector('.form__list__container').innerHTML = entryForm;
}
const newTaskLink = document.querySelector('.link__add').addEventListener('click', handleAddNewTask);
const newTaskBtn = document.querySelector('.btn__add').addEventListener('click', handleAddNewTask );
// event All
const newTaskBtnClose = document.querySelector('#btn__sorting__all').addEventListener('click', () => renderList(todoList));
// event show Done
const doneArray =  todoList.filter((task)=> task.done);
const showDoneBtn = document.querySelector('#btn__sorting__done').addEventListener('click', () => renderList(doneArray));
// event show Todo
const stilTodoArray = todoList.filter((task) => !task.done);
const showTodoBtn = document.querySelector('#btn__sorting__todo').addEventListener('click', () => renderList(stilTodoArray));

// event Sort
const sortBtn = document.querySelector('.btn__sort');
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
sortBtn.addEventListener('click', handleSorting);

function addNewTask() {
    //e.preventDefault();
    const formNewTask = document.querySelector('.newTask');

    const title = formNewTask.querySelector('.inputTitle').value;
    console.log('title: ' + title);

    const description = formNewTask.querySelector('.inputDescription').value;
    console.log('description: ' + description);

    //const done = formNewTask.querySelector('.inputDone');
    const done = formNewTask.querySelector('.inputDone') ? true : false;
    console.log('done? ' + done);

    const start = formNewTask.querySelector('.start').value;
    console.log('start: ' + start);

    const finish = formNewTask.querySelector('.finish').value;
    console.log('finish: ' + finish);

    const importance = formNewTask.querySelectorAll('.rating-star-full').length;
    console.log('importance: ' + importance);

    const newTask = {
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



