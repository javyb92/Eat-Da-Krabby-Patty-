var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");



router.get("/", function(req, res) {
    burgers.selectAll(function(data) {
      var burgerObject = {
        burgers: data
      };
      console.log(burgerObject);
      res.render("index", burgerObject);
    });
  });

  router.post("/api/burgers", function(req, res) {
    burgers.insertOne([
      "name", "devoured"
    ], [
      req.body.name, 0
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });


  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burgers.updateOne({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.delete("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burgers.deleteOne(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  // Export routes for server.js to use.
  module.exports = router;