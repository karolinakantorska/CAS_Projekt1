//Controller
//Controller =======> View/Shared
//Imports Buisness Logic
//Controller =======> Model
//?? Imports Model
//Controller <----onclick---- View/Shared
//Controller <----ondatachange---- Model
//Takes the user's input
//Mediates between the View and the business logic

import { BuisnessLogic} from './shared.js'
import { NotesStorage } from './notes-storage.js'

class Controller {
    constructor() {
        this.appContainer = document.querySelector('.form__list__container');
        //this.appContainer.innerHTML = entryForm;
        // Add+ Btn
        this.newTaskLink = document.querySelector('.link__add');
        this.newTaskBtn = document.querySelector('.btn__add');
        // styleToggler
        this.styleToggler = document.querySelector('.disp-style');
        // All show tasks
        this.thisShowAllBtn = document.querySelector('#btn__sorting__all');
        //TODO closing new task window
        //this.newTaskBtnClose = document.querySelector('');
    }
    initEventListenersInMenu() {
        this.newTaskLink.addEventListener('click', this.renderForm);
        this.newTaskBtn.addEventListener('click', this.renderForm);
        this.styleToggler.addEventListener('click', this.toggleStyle);
        this.thisShowAllBtn.addEventListener('click', this.loadTodoList)
    }
    loadTodoList(){
        this.todoList = notesStorage.getTodoList();
        console.log(this.todoList)
    }
    getInput() {
        // input
        this.formNewTask = document.querySelector('.newTask');
        this.title = document.querySelector('.inputTitle').value;
        this.description = document.querySelector('.inputDescription').value;
        this.done = document.querySelector('.inputDone') ? true : false;
        this.start = document.querySelector('.start').value;
        this.finish = document.querySelector('.finish').value;
        this.importance = document.querySelectorAll('.full').length;
        // generate id
        this.id = 'id' + (new Date()).getTime();
        // TODO delete this later
        /*
        console.log({
            id: this.id,
            inputTitle: this.title,
            start: this.start,
            finish: this.finish,
            done: this.done,
            description: this.description,
            importance: this.importance,
        })
        */
        this.formNewTask.reset();
        const newTask ={
            id: this.id,
            inputTitle: this.title,
            start: this.start,
            finish: this.finish,
            done: this.done,
            description: this.description,
            importance: this.importance,
        }
        console.log(notesStorage);
        notesStorage.addNewTask(newTask);
    }
    renderForm() {
        controller.appContainer.innerHTML = entryForm;
        this.submitBtn = document.querySelector('.btn_task_input');
        this.starBtn = document.querySelector('.stair_rating');
        //ASK
        //why not: this.submitBtn.addEventListener('click', this.getInput);
        this.submitBtn.addEventListener('click', controller.getInput);
        //ASK
        //why not: this.submitBtn.addEventListener('click', this.getInput);
        this.starBtn.addEventListener('click', controller.handleStairRating);
    }
    test(){
        console.log('test')
    }
    toggleStyle(){
        this.cssVariant = document.querySelector('.link_css');
        (/funny/.test(this.cssVariant.href))
            ? this.cssVariant.href = 'buisness.css'
            : this.cssVariant.href = 'funny.css';
    }
    handleStairRating(){
        function addClassToStars(node) {
            const parentsChildren = node.parentElement.children
            const parentsChildrenArray = Object.values(parentsChildren).filter((child) => child.classList.contains('rating-star'))
            const nodeIndex = parentsChildrenArray.indexOf(node)
            parentsChildrenArray.forEach((child, index) => {
                (index <= nodeIndex)
                    ? child.classList.add('full')
                    : child.classList.remove('full')
            })
        }
        event.target.classList.contains('rating-star')
            ? addClassToStars(event.target)
            : null;
    }
    controllerAction(){
        this.initEventListenersInMenu();
    }
}
//TODO take it out from here
const entryForm = `
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
        <span class="stair_rating">
            <label>Importance:</label>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
            <span class="rating-star" role="button"></span>
        </span>
        <input class='btn_task_input' type="button" value="Add Task" >
    </form>
`

const controller = new Controller();
//ASK if it is a wright place to initialise the notesStorage?
const notesStorage = new NotesStorage();
notesStorage.loadData();
controller.controllerAction();




