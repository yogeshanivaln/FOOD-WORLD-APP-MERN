const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Item = require('../models/itemModel');
const checkAuth = require('../checkAuth');

router.get('/',(req,res,next)=>{
 Item.find()
    .exec()
    .then(doc => {
      const response = {
        count: doc.length,
        Items: doc
      };
      
      if (doc) res.status(200).json(response);
      else res.status(404).json({ message: "No data found" });
    })
    .catch(err => console.log(err));
})

router.post("/",/* checkAuth, */(req, res, next) => {
    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      ingredients: req.body.ingredients,
      method:req.body.method
    });
    item
      .save()
      .then(result => {
        res.status(200).json({
          message: "Added Item sucessfully",
          createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id
          }
        });
      })
      .catch(err => res.status(500).json({ error: err }));
  });

  router.patch("/:itemId",/* checkAuth, */ (req, res, next) => {
    const id = req.params.itemId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Item.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message:"Updated Sucessfully"
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
  // for patch body in postman put like this.
  
  /* [// must be array beacuse iterable in for loop
      {"propName":"name","value":"jhkjsbkjsk"}.. etc for all fileds
  ] */
  
  router.delete("/:itemId",/* checkAuth,  */(req, res, next) => {
    const id = req.params.itemId;
    Item.deleteOne({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message:"Deleted Sucessfully"
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

  module.exports = router;
  