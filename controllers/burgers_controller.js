var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");

router.get("/", function(req, res) {
    burgers.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/api/burgers", function(req, res) {
    burgers.insertOne({
      burger_name: req.body.name,
      devoured: 0  
  },function(result){
    if(result.affectedRows == 0){
        res.status(500).end();
    }
    res.status(200).end();
});
});
  
router.post("/api/burgers:id", function(req, res) {
  burgers.updateOne({devoured: 1}, `id = ${req.params.id}`, function(result){
      if(result.affectedRows == 0){
          res.status(500).end();
      }
      res.status(200).end();
  })
});

  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burgers.deleteOne(condition, function(result) {
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;
  