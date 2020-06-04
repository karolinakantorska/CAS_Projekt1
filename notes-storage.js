//Model
//Model ----ondatachange----> Controller
//Model <======== Controller
//Data and business logic for the application

export class NotesStorage {
    constructor() {
        
    }
    loadData() {
        this.todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
    test() {
        console.log('this.getTodoList')
    }
    getTodoList(){
        return this.todoList;
    }
    updateTodoList(todoList) {
        // TODOupdating local todoList / model state
        localStorage.setItem('todoList', JSON.stringify(todoList));
        return todoList;
    }
    addNewTask(newTask) {
        this.todoList.push(newTask);
    }
    /*
    deleteTodo(index) {
        this.todoList = this.todoList.splice(index, 1);
        // or this.todos = this.todos.filter(todo => todo.id !== id)
        this._updateTodoList(this.todoList)
    }
    editTodo(id) {
    }
    */

}