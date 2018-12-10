const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.router.js');
const app = express();
const url = ('url');
const pg = ('pg');
const PORT = process.env.PORT || 1337;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use(bodyParser.json());

//connection to todo router
app.use('/todo',todoRouter);















app.listen(PORT, ()=>{
    console.log('Express now listening on',PORT);
})
