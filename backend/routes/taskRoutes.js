// router.route('/')
// router.route('/:id')
// module.exports = router;


// import express & create a router
const express = require('express');
const router = express.Router();

// import controller functions
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// define routes for `/`
router.route('/')
  .get(getTasks)  //`GET /api/tasks` → returns all tasks
  .post(createTask);   //`POST /api/tasks` → creates a new task

  // define routes for `/:id`
router.route('/:id')
  .get(getTask)   //`GET /api/tasks/:id` → get one task by ID
  .put(updateTask) //`PUT /api/tasks/:id` → update a task by ID
  .delete(deleteTask);  //`DELETE /api/tasks/:id` → delete a task by ID

// export the router
module.exports = router;