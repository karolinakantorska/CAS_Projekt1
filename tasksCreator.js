import {Task} from './shared.js';

export class TasksList {
    constructor(tasksListModel) {
        //this.data = tasksListModel;
        //this.tasks=[];
    }
    createTask(title, start, finish, done, description, importance){
        const id = 'id' + (new Date()).getTime();
        this.task = new Task(id, title, start, finish, done, description, importance);
        console.log(this.task)
        return this.task;
    }
}