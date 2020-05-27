// style toggler
const styleToggler = document.querySelector('.disp-style').addEventListener('click', () => {
    const cssVariant = document.querySelector('.link_css');
    (/funny/.test(cssVariant.href))
        ? cssVariant.href = 'buisness.css' 
        : cssVariant.href = 'funny.css';  
});
// TODO delete it when local storage works
const todoList = [
    {
        id: '30.09.2020',
        title: 'Feed the cat',
        start: 1983,
        finish: 2022,
        done: true,
        description: 'Tekst describing the task.',
        //importance: '&#9733;&#9733;&#9733;&#9733;&#9733',
        importance: 5,
    },
    {
        id: '27.08.2020',
        title: 'Clean the house',
        start: 1982,
        finish: 2021,
        done: true,
        description: `First the windows, then try to find the valum claener...First the windows, then try to find the
                            valum claener...First the windows, then try to find the valum claener...`,
        //importance: '&#9733;&#9733;&#9734;&#9734;&#9734;',
        importance: 2,
    },
    {
        id: '28.08.2020',
        title: 'Repair a bike',
        start: 1985,
        finish: 2020,
        done: false,
        description: `maybe it would be better ask somebody for a help`,
        //importance: '&#9733;&#9733;&#9734;&#9734;&#9734;',
        importance: 1,
    },
]
// local storage
localStorage.setItem('todoList', JSON.stringify(todoList));
console.log(JSON.parse(localStorage.getItem('todoList')))

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
        <div>
            <label for="title">Task title: </label>
            <input type="text" name="title" class="inputTitle" required>
        </div>
        <div>
            <label for="description">Description: </label>
            <input type="text" name="description" class="inputDescription">
        </div>
        <div>
            <input type="radio" class="inputTodo" checked>
            <label>Todo</label>
            <input type="radio" class="inputDone">
            <label>Done</label>
        </div>
        <div>
            <label for="start">Start date:</label>
            <input type="date" class="start" name="inputStart">
            <label for="finish">Finish date:</label>
            <input type="date" class="finish" name="inputFinish">
       </div>
        <div>
            <label>Importance:</label>
            <input type="checkbox" class="inputImportance1">
            <input type="checkbox" class="inputImportance2">
            <input type="checkbox" class="inputImportance3">
            <input type="checkbox" class="inputImportance4">
            <input type="checkbox" class="inputImportance5">
        </div>
        <input class='btn_task_input' type="button" value="Add Task" onclick= "handleFormData()">
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
// data von form
const container = document.querySelector('.sorting_options__radio');


function handleFormData() {
    console.log(document.querySelector('.newTask'));
    const formNewTask = document.querySelector('.newTask')
    // just to see what is comming
    const newTaskTitle = formNewTask.querySelector('.inputTitle');
    console.log('newTaskTitle: ' + newTaskTitle.value);
    const newTaskDescription = formNewTask.querySelector('.inputDescription');
    console.log('newTaskDescription: ' + newTaskDescription.value);
    const newTaskStart = formNewTask.querySelector('.start');
    console.log('newTasktart: ' + newTaskStart.value);


}

