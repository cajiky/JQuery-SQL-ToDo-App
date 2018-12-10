let freshTodo;
let status;
console.log('JS');
$(onReady);

function onReady(){
    console.log('JQ');
    getToDo();
    clickListener();
}

//class to build the tasks
class ToDoTask{
    constructor(task_discription,task_completed,task_priority){
        this.task_discription = task_discription;
        this.task_completed = task_completed;
        this.task_priority = task_priority;
    }
}
//GET
function getToDo(){
    $.ajax({
        method:'GET',
        url: '/todo',
    })
    .then(function(response){
        console.log('we got a response from our server',response);
        appendToDOM(response);
    })
    .catch(function(error){
        console.log('we got an error trying to connect to server in get',error);
    })
}
//POST
function postToDo(){
    $.ajax({
        method:'POST',
        url:'/todo',
        data: freshTodo //takes the new built task and packages it for server side processing
    })
    .then(function(response){
        console.log('this is our response to POST req',response)
        getToDo(response);

    })
    .catch(function(error){
        console.log('error in our post req',error);
    })
}

//DELETE
function deleteToDo(taskId){
    console.log(taskId);
    $.ajax({
        method: 'DELETE',
        url: `/todo/${taskId}`
    })
    .then(function(response){
        console.log('this is our response from our server on the delete req', response);
        getToDo();
    })
    .catch(function(error){
        alert('got an error on the delete request', error);
    })
}

//PUT
function taskCompleted(taskId, stateChange){
    console.log(stateChange);
    $.ajax({
        method: 'PUT',
        url: `/todo/complete/${taskId}`,
        data: {
            completionState: stateChange
        },
    })
    .then(function(response){
        console.log('response from our state change', response)
        getToDo();
    })
    .catch(function(error){
        alert('error in the put request', error)
    })
}

function clickListener() {
    $('#addTaskButton').on('click', createToDo);
    $('#todoListDisplay').on('click','.btn-danger',function(){
        let $row = $(this).closest('tr');
        let taskId = $row.data('id');
        deleteToDo(taskId)
    });
    $('#todoListDisplay').on('click', '.btn-success',function() {
      let $row = $(this).closest('tr');
      let taskId = $row.data('id');
      let task_completed = 1;
      taskCompleted(taskId, task_completed)

    })
    // $('#createProjectButotn').on('click',createNewProject)
}

//Function creating new todo
function createToDo(){
    let task_discription = prompt('Describe the Task');
    let task_completed = 0;
    let task_priority = prompt('Tasks priority? (low,med,high)')

    console.log(task_discription);


     freshTodo = new ToDoTask(task_discription,task_completed,task_priority);
     postToDo();
}

//append to dom funciton
function appendToDOM(response){
    console.log('this is our append to dom function', response);
    let re = response;
    let el = $('#todoListDisplay')
    el.empty();
   for(let task of response){
       if(task.task_completed === 0){
           status = 'In Progress';
       }
       else{
           status = 'Completed';
       }

       if(status === 'In Progress'){
           textColor = 'red';
       }
       else{
           textColor = 'green';
       }
       
    let appendedToDo = $(`
    <tr>
        <td>${task.task_description}</td>
        <td class="${textColor}">${status}</td>
        <td>${task.task_priority}</td>
        <td><button class="btn btn-sm btn-danger waves-effect">DELETE</button><button type="button" class="btn btn-sm btn-success waves-effect">Done</button></td>
    </tr>
    `)
    el.append(appendedToDo);
    appendedToDo.data('id',task.task_id);
   }
}




