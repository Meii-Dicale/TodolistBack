const express = require('express')
const app = express();
const crudUser = require('./routes/crudUser');
const crudTask = require('./routes/crudTask');


app.use(express.json());

app.use('/user', crudUser);
app.use('/task', crudTask)
app.listen(3007, () =>{
    console.log('port 3007')
})
