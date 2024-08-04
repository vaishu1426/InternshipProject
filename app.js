const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize the app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("mongodb connected");
}).catch((err) => {
  console.log('failed to connect to mongodb', err);
});

// Define the User schema and model
const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);

// Define the Professor schema and model
const User1Schema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Studies: {
    type: String,
    required: true,
  },
  Job: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  }
});

const User1 = mongoose.model("users1",User1Schema);

// Define the newSchema and model for login
const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const Collection = mongoose.model("Collection", newSchema);

// Define routes for users
app.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post('/addUser', async (req, res) => {
  const { Name, Subject, Branch, Age } = req.body;
  try {
    const newUser = new User({ Name, Subject, Branch, Age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/editUser/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, Subject, Branch, Age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { Name, Subject, Branch, Age }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Define routes for professors
app.get('/getUser1', async (req, res) => {
  try {
    const users1 = await User1.find();
    res.json(users1);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post('/addUser1', async (req, res) => {
  const { Name, Studies, Job, Age } = req.body;
  try {
    const newUser1 = new User1({ Name, Studies, Job, Age });
    await newUser1.save();
    res.status(201).json(newUser1);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/editUser1/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, Studies, Job, Age } = req.body;
  try {
    const updatedUser1 = await User1.findByIdAndUpdate(id, { Name, Studies, Job, Age }, { new: true });
    res.json(updatedUser1);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/deleteUser1/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User1.findByIdAndDelete(id);
    res.json({ message: 'User1 deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await Collection.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const data = { email: email, password: password };
  try {
    const check = await Collection.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      await Collection.insertMany([data]);
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { User,User1, Collection };
