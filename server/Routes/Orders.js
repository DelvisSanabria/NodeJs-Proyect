const Order = require("./../Models/Order");
const routerOrders = require("express").Router();

routerOrders.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const orderBy = req.query.orderBy || "usuario";
    const start = parseInt(req.query.start) || 0;
    const end = parseInt(req.query.end);

    let orders = Order.find()
    if(limit > 0){
      orders = orders.limit(limit)
    }
    if(orderBy){
      orders = orders.sort({[orderBy]:1})
    }
    if(start && end){
      orders = orders.skip(start).limit(end);
    }
    const results = await orders.exec()
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


routerOrders.get("/search", async (req, res) => {
  try {
    const name = req.query.term
    let orders = await Order.find();
    let filteredOrders = orders.filter(order => order.nombre.toLowerCase().includes(name.toLowerCase()))
    res.json(filteredOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerOrders.get("/ordersFrom/:usuario", async (req, res) => {
  try {
    let order = await Order.find({ usuario: req.params.usuario });
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerOrders.get("/lastorderFrom/:usuario", async (req, res) => {
  try {
    let order = await Order.findOne({ usuario: req.params.usuario }).sort({createdAt: -1});
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerOrders.get("/:id", async (req, res) => {
  try {
    let order = await Order.find({ _id: req.params.id });
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerOrders.post("/", async (req, res) => {
  try {
    let order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerOrders.patch("/:id", async (req, res) => {
  try {
    const updated = await Order.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

routerOrders.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.deleteOne({ _id: req.params.id });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = routerOrders;