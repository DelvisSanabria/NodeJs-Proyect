const User = require("./../Models/User");
const routerUsers = require("express").Router();

routerUsers.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const orderBy = req.query.orderBy || "nombre";
    const start = parseInt(req.query.start) || 0;
    const end = parseInt(req.query.end);

    let users = User.find()
    if(limit > 0){
      users = users.limit(limit)
    }
    if(orderBy){
      users = users.sort({[orderBy]:1})
    }
    if(start && end){
      users = users.skip(start).limit(end);
    }
    const results = await users.exec()
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


routerUsers.get("/search", async (req, res) => {
  try {
    const name = req.query.term
    let users = await User.find();
    let filteredUser = users.filter(user => user.nombre.toLowerCase().includes(name.toLowerCase()))
    res.json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.get("/:id", async (req, res) => {
  try {
    let user = await User.find({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.post("/", async (req, res) => {
  try {
    let user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.patch("/:id", async (req, res) => {
  try {
    const updated = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerUsers.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.deleteOne({ _id: req.params.id });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = routerUsers;