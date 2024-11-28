import data from './tasks.json' with {type: "json"};

const list = Array();

function Task(task, priority){
    this.name = task;
    this.status = 'In progresss';
    this.priority = priority;
}

function addTask(task, priority){
    if(task && priority){
        if(!list.find(findedTask => findedTask.name == task)){
            const newTask = new Task(task, priority);
            list.push(newTask);
        } else{
            throw new Error('Такая задача уже существует');
        }
    } else{
        throw new Error('Введено некорректно!');
    }
}

function changeStatusTask(task, status){
    if(task && status){
        if(list.find(findedTask => findedTask.name == task)){
            const changedTaskIndex = list.findIndex(findedTask => findedTask.name == task);
            let changedTask = list.splice(changedTaskIndex, 1).find(findedTask => findedTask.name == task);
        
            changedTask.status = status;
        
            list.splice(changedTaskIndex, 0, changedTask);
        } else {
            console.log('Задача не найдена');
        }
    }
}

function deleteSelectedTask(task){
    if(list.find(findedTask => findedTask.name == task)){
        list.splice(list.findIndex(findedTask => findedTask.name == task), 1);
    } else {
        console.log('Задача не найдена');
    }    
}

function selectTask(){
    const tasks = document.querySelectorAll('.todo__task');

    tasks.forEach((task) => {
        task.addEventListener('click', (event) => {
            const textTask = task.querySelector('#textTask').textContent;

            if(event.target == task.querySelector('#deleteButton')){
                deleteSelectedTask(textTask);
                showTasks(task.getAttribute('data-priority'));
            }

            if(event.target == task.querySelector('#taskStatus')){
                if(task.querySelector('#taskStatus').checked){
                    changeStatusTask(textTask, 'done');
                } else{
                    changeStatusTask(textTask, 'In progress');
                }

                showTasks(task.getAttribute('data-priority'));
            }
        });
    })
    
}

function createNewElements(text, priority, status){
    const newDivTask = document.createElement('div');
    const newCheckbox = document.createElement('input');
    const newLabelTask = document.createElement('label');
    const newButtonDelete = document.createElement('span');

    newDivTask.classList.add('todo__task');
    newDivTask.setAttribute('data-priority', priority);
    newDivTask.setAttribute('data-status', status);
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('id', 'taskStatus');
    newLabelTask.textContent = text;
    newLabelTask.setAttribute('id', 'textTask');
    newButtonDelete.setAttribute('id', 'deleteButton');
    newButtonDelete.innerHTML = `&#x2715;`;

    if(status === 'done'){
        newCheckbox.checked = true;
    } else{
        newCheckbox.checked = false;
    }

    newDivTask.append(newCheckbox, newLabelTask, newButtonDelete);

    return newDivTask;
}

function showTasks(priorityList){
    const divTaskLists = document.querySelectorAll('.todo__list');

    if(!list.length){
        // console.log('Список задач пуст');

        while(divTaskLists[0].firstChild){
            divTaskLists[0].removeChild(divTaskLists[0].firstChild);
        }
        while(divTaskLists[1].firstChild){
            divTaskLists[1].removeChild(divTaskLists[1].firstChild);
        }

    } else{
        if(priorityList == 'high'){
            while(divTaskLists[0].firstChild){
                divTaskLists[0].removeChild(divTaskLists[0].firstChild);
            }
    
            for(const task of list){
                if(task.priority == 'high'){
                    divTaskLists[0].append(createNewElements(task.name, task.priority, task.status));
                }
            }
        }

        if(priorityList == 'low'){
            while(divTaskLists[1].firstChild){
                divTaskLists[1].removeChild(divTaskLists[1].firstChild);
            }
    
            for(const task of list){
                if(task.priority == 'low'){
                    divTaskLists[1].append(createNewElements(task.name, task.priority, task.status));
                }
            }
        }        
    }

    selectTask();
}

document.addEventListener('DOMContentLoaded', () => {
    // for(const task of data.tasks){
    //     list.push(task);
    //     showTasks(task.priority);
    // }

    function d(i, arr){
        if(i == Object.keys(data.tasks).length){
            return;
        } else {
            list.push(data.tasks[i]);
            showTasks(data.tasks[i].priority);
            return d(i + 1, arr);
        }
    }
    
    d(0, data.tasks);
})

const addTaskForm = document.querySelectorAll('.addTaskForm');

addTaskForm.forEach((inputPriority) => {
    inputPriority.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskValue = inputPriority.querySelector('#newTaskValue');
    
        try {
            addTask(taskValue.value, taskValue.getAttribute('data-priority'));
        } catch (error) {
            alert(error.message);
        }

        taskValue.value = '';
    
        showTasks(inputPriority.getAttribute('data-priority'));
    })
})