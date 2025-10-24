## 🧠 What This Code Does

You’re defining a **Mongoose schema and model** called `Task`.
This schema acts as a blueprint for how each **Task document** will look in your **MongoDB collection**.

---

### 🧩 Breakdown of Each Part

#### 1. Importing Mongoose

```js
const mongoose = require('mongoose');
```

You need Mongoose to define schemas and models that map to MongoDB collections.

---

#### 2. Defining the Schema

```js
const taskSchema = new mongoose.Schema({...}, {...});
```

Schemas define the structure, validation rules, and default values of documents in a collection.

Here’s what each field does:

| Field           | Type     | Description                                    | Validation / Default                                                              |
| --------------- | -------- | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| **title**       | `String` | Task name                                      | Required, trimmed, max 100 chars                                                  |
| **description** | `String` | Task details                                   | Optional, trimmed, max 500 chars                                                  |
| **status**      | `String` | Current task state                             | Only one of: `'pending'`, `'in-progress'`, `'completed'` <br>Default: `'pending'` |
| **priority**    | `String` | Task importance level                          | Only one of: `'low'`, `'medium'`, `'high'` <br>Default: `'medium'`                |
| **dueDate**     | `Date`   | Optional deadline                              | —                                                                                 |
| **timestamps**  | Auto     | Adds `createdAt` and `updatedAt` automatically | Enabled via `timestamps: true`                                                    |

---

#### 3. Creating and Exporting the Model

```js
module.exports = mongoose.model('Task', taskSchema);
```

This line creates a **Mongoose model** named `Task`, which you can now use throughout your app to perform CRUD operations.

---

### ⚙️ How to Use It

Here’s an example of how to use your `Task` model in a controller or service file:

```js
const Task = require('./models/task');

// Create a new task
const createTask = async () => {
  try {
    const task = await Task.create({
      title: 'Learn Mongoose',
      description: 'Study how schemas and models work',
      priority: 'high',
      dueDate: new Date('2025-11-01'),
    });
    console.log('Task created:', task);
  } catch (err) {
    console.error(err.message);
  }
};

// Run the example
createTask();
```

---

### 🔍 Example MongoDB Document

After running that code, your MongoDB document would look like this:

```json
{
  "_id": "67179a4b8d9a9f6e1234abcd",
  "title": "Learn Mongoose",
  "description": "Study how schemas and models work",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-11-01T00:00:00.000Z",
  "createdAt": "2025-10-22T05:30:00.000Z",
  "updatedAt": "2025-10-22T05:30:00.000Z",
  "__v": 0
}
```

---

### 🚀 Bonus Tip – Controller & Routes Example

If you’re using **Express**, you can easily integrate this model:

**`routes/taskRoutes.js`**

```js
const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create a task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
```

Then, in your **`server.js`**:

```js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
```

