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
    constructor(buisnessLogic) {
        //const buisnessLogic = new BuisnessLogic();
        this.appContainer = document.querySelector('.form__list__container');
        //this.appContainer.innerHTML = entryForm;
        this.buisnessLogic = buisnessLogic;
        // Add+ Btn
        this.newTaskLink = document.querySelector('.link__add');
        this.newTaskBtn = document.querySelector('.btn__add');
        // styleToggler
        this.styleToggler = document.querySelector('.disp-style');
        // All show tasks
        this.thisShowAllBtn = document.querySelector('#btn__sorting__all');
        // Sort Btn
        this.sortBtn = document.querySelector('.btn__sort');
        // SortForm HTMLCollection
        this.sortFormHTMLCollection = Array.from(document.querySelector('.sorting_options__radio').children) ;
        this.radioInputs = [];
        this.sortInput = this.sortFormHTMLCollection.filter((item) => item.localName === "label").forEach((item) => this.radioInputs.push(...item.children));     
        // Show Done Btn
        this.showDoneBtn = document.querySelector('#btn__sorting__done');
        // Show Todo Btn
        this.showTodoBtn = document.querySelector('#btn__sorting__todo');
    }
    initEventListenersInMenu() {
        this.newTaskLink.addEventListener('click', this.renderForm);
        this.newTaskBtn.addEventListener('click', this.renderForm);
        this.styleToggler.addEventListener('click', this.toggleStyle);
        this.thisShowAllBtn.addEventListener('click', () => this.renderTodoList(this.todoList));
        //this.sortBtn.addEventListener('click', () => this.buisnessLogic.sortingAList(this.todoList, this.radioInputs));
        this.sortBtn.addEventListener('click', () => this.renderTodoList(this.listSortedByImportance()));
        // TODO change a list that will be sorted out
        this.showDoneBtn.addEventListener('click', () => this.renderTodoList(this.buisnessLogic.filterDone(this.todoList)));
        this.showTodoBtn.addEventListener('click', () => this.renderTodoList(this.buisnessLogic.filterTodo(this.todoList)));
    }
    listSortedByImportance(){
        return this.buisnessLogic.sortingAList(this.todoList, this.radioInputs)
    }
    renderTodoList(list){
        // list must be a string
        //reading the templates
        this.templateSource = document.querySelector("#entry-template").innerHTML;
        // compiling template string into template function 
        this.template = Handlebars.compile(this.templateSource);
        this.ulTodoList = document.createElement('ul');
        this.ulTodoList.setAttribute('class', 'list__container');
        this.ulTodoList.innerHTML = this.template(list);
        this.ulTodoList.addEventListener('click', (e) => this.editTask(e));
        //ASK NOT URGENT why: this.appContainer.removeChild(this.appContainer.firstChild) doesn't work
        this.appContainer.innerHTML = '';
        this.appContainer.appendChild(this.ulTodoList);
        //document.querySelector('.list__container').addEventListener('click', handlerEditTask);
    }
    handleEditTask(e){
        //ASK NOT URGENT why it doesn,t work
        //e.stopPropagation();
        event.target.classList.contains('edit')
            ? this.editTask()
            : null;
    }
    editTask(){
        this.liChildrenNodes = event.target.parentElement.children;
        this.id = Object.values(this.liChildrenNodes).find((child) => child.className.includes('id')).innerText;
        this.renderForm();
        const defalutValuesObject = notesStorage.getNodeByID(this.id)[0];
        document.querySelector('.inputTitle').setAttribute('value', `${defalutValuesObject.title}`);
        document.querySelector('.inputDescription').setAttribute('valuet', `${defalutValuesObject.description}`);
        document.querySelector('.start').setAttribute('value', `${defalutValuesObject.start}`);
        document.querySelector('.finish').setAttribute('value', `${defalutValuesObject.finish}`);
        notesStorage.deleteNodeByID(this.id);
        this.controllerAction();
    }
    getInput() {
        // input
        this.formNewTask = document.querySelector('.newTask');
        this.title = document.querySelector('.inputTitle').value;
        this.description = document.querySelector('.inputDescription').value;
        this.done = document.querySelector('.inputDone').checked
        console.log(document.querySelector('.inputDone').checked)
        this.start = document.querySelector('.start').value;
        this.finish = document.querySelector('.finish').value;
        this.importance = document.querySelectorAll('.full').length;
        // generate id
        this.id = 'id' + (new Date()).getTime();
        this.formNewTask.reset();
        const newTask ={
            id: this.id,
            title: this.title,
            start: this.start,
            finish: this.finish,
            done: this.done,
            description: this.description,
            importance: this.importance,
        }
        notesStorage.addNewTask(newTask);
    }
    renderForm() {
        //reading the templates
        this.templateSourceInput = document.querySelector("#input-template").innerHTML;
        // compiling template string into template function
        this.templateInput = Handlebars.compile(this.templateSourceInput);
        controller.appContainer.innerHTML = this.templateInput(this.todoList);
        this.submitBtn = document.querySelector('.btn_task_input');
        this.starBtn = document.querySelector('.stair_rating');
        this.inputCloseBtn = document.querySelector('.btn_task_input_close');
        //ASK Why it is not working here and by All btn it works
        this.inputCloseBtn.addEventListener('click', () => this.renderTodoList(this.todoList));
        //ASK
        //why not: this.submitBtn.addEventListener('click', this.getInput);
        //TODO it should be 'submit' not 'click'
        this.submitBtn.addEventListener('click', controller.getInput);
        //ASK
        //why not: this.starBtn.addEventListener('click', this.getInput);
        this.starBtn.addEventListener('click', controller.handleStairRating);
        
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
        this.todoList = notesStorage.getTodoList();
    }
}
const buisnessLogic = new BuisnessLogic();
//ASK why I have to put this inside
const controller = new Controller(buisnessLogic);
//ASK if it is a wright place to initialise the notesStorage?
const notesStorage = new NotesStorage();
//const todoList = notesStorage.getTodoList();
//console.log(todoList)
controller.controllerAction();