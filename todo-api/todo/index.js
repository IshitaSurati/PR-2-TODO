const express = require('express');
const app = express();
app.use(express.json()); 

const todosRouter = require('./todos');

app.get('/', (req, res) => {
    res.send('Welcome to the TODO API');
});

app.use('/todos', todosRouter);

app.listen(8090, () => {
    console.log(`Server running on port 8090`);
});
