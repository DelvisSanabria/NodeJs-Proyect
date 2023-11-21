const Product = require("./../Models/Product");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const orderBy = req.query.orderBy || "nombre";
    const start = parseInt(req.query.start) || 0;
    const end = parseInt(req.query.end);

    let products = Product.find()
    if(limit > 0){
      products = products.limit(limit)
    }
    if(orderBy){
      products = products.sort({[orderBy]:1})
    }
    if(start && end){
      products = products.skip(start).limit(end);
    }
    const results = await products.exec()
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/search", async (req, res) => {
  try {
    const name = req.query.term
    let products = await Product.find();
    let filteredProd = products.filter(product => product.nombre.toLowerCase().includes(name.toLowerCase()))
    res.json(filteredProd);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.find({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.deleteOne({ _id: req.params.id });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;