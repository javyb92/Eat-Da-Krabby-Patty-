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

  router.post("/api/burger", function(req, res) {
    burgers.insertOne([
      "name", "devoured"
    ], [
      req.body.name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

  // Export routes for server.js to use.
  module.exports = router;