
#### 1. Import Mongoose

```js
const mongoose = require('mongoose');
```

You import the **Mongoose** library to interact with MongoDB.

---

#### 2. Define `connectDB` Function

```js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
```

* **`process.env.MONGODB_URI`**
  → Reads the MongoDB connection string from environment variables (keeps your credentials safe and flexible).
  Example value in `.env` file:

  ```env
  MONGODB_URI=mongodb://localhost:27017/mydatabase
  ```

  or if using MongoDB Atlas:

  ```env
  MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase
  ```

* **`useNewUrlParser` and `useUnifiedTopology`**
  → Options for the Mongoose connection to handle newer MongoDB drivers properly.

* **`await mongoose.connect()`**
  → Initiates the connection asynchronously and returns a connection object if successful.

* **`console.log()`**
  → Displays the connected host name when successful (e.g., `MongoDB Connected: localhost`).

* **`process.exit(1)`**
  → Stops the app if the connection fails, preventing it from running in an unstable state.

---

#### 3. Export the Function

```js
module.exports = connectDB;
```

This allows you to import and call the function in your main server file, e.g. `server.js` or `app.js`:

```js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.listen(5000, () => console.log('Server running on port 5000'));
```

---

### ✅ **Summary**

| Step | Description                                   |
| ---- | --------------------------------------------- |
| 1    | Import mongoose                               |
| 2    | Connect to MongoDB using environment variable |
| 3    | Log success or handle error                   |
| 4    | Export function for reuse                     |

