//setting up our router to organize traffic through the server
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool-database.js');


//get request to our database.
router.get('/',(req,res)=>{
    const sqlText = 'SELECT * FROM todolist ORDER BY task_completed, task_priority;'
    pool.query(sqlText)
    .then((result)=>{
        res.send(result.rows);
    })
    .catch((error)=>{
        console.log(`Error making query ${sqlText}`, error);
        res.sendStatus(500); // good server always sends stuff back :)
    })
})

//POST req to db
router.post('/',(req,res)=>{
    console.log('in post process');
    console.log(req.body);
    const newTodo = req.body;
    const sqlText = 'INSERT INTO todolist(task_description,task_completed,task_priority) VALUES ($1,$2,$3)'
    pool.query(sqlText, [newTodo.task_discription,newTodo.task_completed,newTodo.task_priority])
    .then((result)=>{
        console.log('added todo to db', result);
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log('error sending post to db',error)
        res.sendStatus(500);
    })
})

//DELETE

router.delete('/:id', (req,res)=>{
    let reqId = req.params.id;
    console.log(reqId);
    let sqlText = 'DELETE FROM todolist WHERE task_id=$1;'
    pool.query(sqlText,[reqId])
    .then((result)=>{
        console.log('Task has been removed', result)
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('error in our server side delete request',error);
        res.sendStatus(500);
    })
})

//PUT
router.put('/complete/:id', (req,res)=>{
    let reqId = req.params.id;
    console.log(reqId);
    const sqlText = 'UPDATE todolist SET task_completed = 1 WHERE task_id=$1;' // changes completion state of the task from In Progress to complete
    pool.query(sqlText,[reqId])
    .then((result)=>{
        console.log('good PUT req')
        res.sendStatus(200)
    })
    .catch((error)=>{
        console.log('error in put req',error);
        res.sendStatus(500);
    })
})







module.exports = router;