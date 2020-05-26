// style toggler
const styleToggler = document.querySelector('.disp-style').addEventListener('click', () => {
    const cssVariant = document.querySelector('.link_css');
    (/funny/.test(cssVariant.href))
        ? cssVariant.href = 'buisness.css' 
        : cssVariant.href = 'funny.css';  
});
// local storage
    localStorage.setItem('favoriteflavor', 'vanilla');
const todoList = [
    {
        id: '30.09.2020',
        title: 'Feed the cat',
        created: '30.09.2020',
        finish: '27.08.2020',
        done: true,
        description: 'Tekst describing the task.',
        importance: '&#9733;&#9733;&#9733;&#9733;&#9733'
    },
    {
        id: '27.08.2020',
        title: 'Clean the house',
        created: '27.08.2020',
        finish: '20.08.2020',
        done: false,
        description: `First the windows, then try to find the valum claener...First the windows, then try to find the
                            valum claener...First the windows, then try to find the valum claener...`,
        importance: '&#9733;&#9733;&#9734;&#9734;&#9734;',
    },
    {
        id: '28.08.2020',
        title: 'Repair a bike',
        created: '27.08.2020',
        finish: '20.08.2020',
        done: false,
        description: `maybe it would be better ask somebody for a help`,
        importance: '&#9733;&#9733;&#9734;&#9734;&#9734;',
    },
]
// List Templates
//reading the templates
const templateSource = document.getElementById("entry-template").innerHTML;
// compiling template string into template function 
const template = Handlebars.compile(templateSource);
//
function renderTodoList(){
    document.querySelector('.list__container').innerHTML = template(todoList);
}
function init() {
    renderTodoList();
}
init();
