### 📘 1. Import Express and Create a Router

```js
const express = require('express');
const router = express.Router();
```

* `express` is the web framework for Node.js.
* `express.Router()` creates a **mini Express app** — a modular, mountable route handler.
* You can define routes here and then “attach” this router to your main app (like `app.use('/api/tasks', taskRoutes)`).

---

### 📦 2. Import Controller Functions

```js
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
```

* These are the **controller functions** (defined elsewhere, e.g., in `controllers/taskController.js`).
* Each one handles a specific route’s logic, such as fetching tasks from a database or creating a new one.

Typical controller file might look like:

```js
exports.getTasks = (req, res) => { ... }
exports.getTask = (req, res) => { ... }
exports.createTask = (req, res) => { ... }
exports.updateTask = (req, res) => { ... }
exports.deleteTask = (req, res) => { ... }
```

---

### 🚦 3. Define Routes for `/`

```js
router.route('/')
  .get(getTasks)
  .post(createTask);
```

* `router.route('/')` defines routes for the base path (like `/api/tasks`).
* `.get(getTasks)` → When the client sends a `GET` request, call `getTasks()` to fetch all tasks.
* `.post(createTask)` → When the client sends a `POST` request, call `createTask()` to add a new task.

So:

* `GET /api/tasks` → returns all tasks
* `POST /api/tasks` → creates a new task

---

### 🧭 4. Define Routes for `/:id`

```js
router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);
```

* `/:id` is a **route parameter** — e.g., `/api/tasks/123`.
* `.get(getTask)` → fetch one specific task by its ID.
* `.put(updateTask)` → update a task by ID.
* `.delete(deleteTask)` → delete a task by ID.

So:

* `GET /api/tasks/:id` → get one task
* `PUT /api/tasks/:id` → update that task
* `DELETE /api/tasks/:id` → remove that task

---

### 📤 5. Export the Router

```js
module.exports = router;
```

* This lets you import and use this router in your main app file (usually `app.js` or `server.js`):

  ```js
  const taskRoutes = require('./routes/taskRoutes');
  app.use('/api/tasks', taskRoutes);
  ```

---

### 🧩 In Short

This file defines a **Task API Router** with CRUD operations:

| HTTP Method | Route  | Controller | Purpose         |
| ----------- | ------ | ---------- | --------------- |
| GET         | `/`    | getTasks   | Fetch all tasks |
| POST        | `/`    | createTask | Add a new task  |
| GET         | `/:id` | getTask    | Fetch one task  |
| PUT         | `/:id` | updateTask | Update a task   |
| DELETE      | `/:id` | deleteTask | Delete a task   |
