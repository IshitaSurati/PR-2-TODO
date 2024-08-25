const express = require('express');
const router = express.Router();

let initialTodo = [
    { title: 'HTML', isCompleted: true, id: 1 },
    { title: 'JavaScript', isCompleted: true, id: 2 },
    { title: 'React', isCompleted: false, id: 3 }
];

router.get('/', (req, res) => {
    res.json(initialTodo);
});

router.post('/addtodo', (req, res) => {
    const { title, isCompleted } = req.body;
    if (!title || typeof isCompleted !== 'boolean') {
        return res.status(400).send('Invalid data');
    }

    const newTodo = {
        id: initialTodo.length ? initialTodo[initialTodo.length - 1].id + 1 : 1,
        title,
        isCompleted
    };
    initialTodo.push(newTodo);
    res.json(newTodo);
});

router.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const todo = initialTodo.find(t => t.id == id);

    if (!todo) {
        return res.status(404).send('Todo not found');
    }

    const { title, isCompleted } = req.body;
    if (title) todo.title = title;
    if (typeof isCompleted === 'boolean') todo.isCompleted = isCompleted;

    res.json(todo);
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = initialTodo.findIndex(t => t.id == id);

    if (index === -1) {
        return res.status(404).send('Todo not found');
    }

    let deletedTodo = initialTodo.splice(index, 1)[0];
    res.json({ deletedTodo, todos: initialTodo });
});

router.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = initialTodo.find(t => t.id == id);

    if (!todo) {
        return res.status(404).send('Todo not found');
    }

    res.json(todo);
});

router.get('/findbystatus', (req, res) => {
    const { isCompleted } = req.query;
    
    if (isCompleted === undefined) {
        return res.status(400).send('Query parameter isCompleted is required');
    }

    const filteredTodos = initialTodo.filter(t => t.isCompleted.toString() === isCompleted);
    res.json(filteredTodos);
});

module.exports = router;
