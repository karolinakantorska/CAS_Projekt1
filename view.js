export class View {
    constructor() {
        this.appContainer = document.querySelector('.form__list__container');
        
        //this.formNewTask = document.querySelector('.newTask')? 
        //this.title = document.querySelector('.inputTitle').value;
        //this.description = formNewTask.querySelector('.inputDescription').value;
        //this.done = formNewTask.querySelector('.inputDone') ? true : false;
        //this.start = formNewTask.querySelector('.start').value;
        //this.finish = formNewTask.querySelector('.finish').value;
        //this.importance = formNewTask.querySelectorAll('.full').length;
        
    }
    getInput() {
        return  {
            id : this.id,
            inputTitle : this.title,
            start : this.start,
            finish : this.finish,
            done : this.done,
            description : this.description,
            importance : this.importance,
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            amount: this.amount,
            amountPerDelivery: this.amountPerDelivery,
            isMeet: this.isMeet
        };
    }


    test(){
    console.log(this.getInput())
    }
    renderForm() {
        this.appContainer.innerHTML = entryForm;
    }
}


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