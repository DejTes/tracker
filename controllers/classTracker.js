const express = require("express");
const router = express.Router();
const seedData = require("../models/tracker.js");
const Tracker = require("../models/trackerSchema");
//const methodOverride = require('method-override');

//routes now go in here and say router.get instead of app.get

// ========================
// Delete Route
// ========================
router.delete("/:id", (req, res) => {
  Tracker.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/tracker/index");
  });
});

// ========================
// Seed Route
// ========================

// router.get('/seed', (req, res) => {
//     // console.log(seedData)
// 	Tracker.create(seedData, (err, data) => {
//         if(err) {
//             console.log(err)
//         }
// 		console.log('seed data', data)
//         res.send(data);
// 	});
// });

// =======================
// Edit
// =======================
router.get("/:id/edit", (req, res) => {
  Tracker.findById(req.params.id, (err, foundTracker) => {
    //find the fruit
    res.render(
      "edit.ejs", //reroutes to edit.ejs file
      {
        tracker: foundTracker, //pass in found fruit
      }
    );
  });
});

router.put("/:id", (req, res) => {
  Tracker.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedTracker) => {
      // if(err) {
      //     console.log(err)
      // }
      //console.log("updated", updatedTracker)
      res.redirect("/tracker/index");
    }
  );
});

// ========================
// Show
// ========================
router.get("/:id", (req, res) => {
  Tracker.findById(req.params.id, (error, foundTracker) => {
    if (error) {
      console.log(error);
    }
    res.render("show.ejs", {
      tracker: foundTracker,
    });
  });
});

// ========================
// Index
// ========================

router.get("/", (req, res) => {
  Tracker.find({}, (error, allTracker) => {
    res.render("index.ejs", {
      trackers: allTracker,
    });
  });
});


// ========================
// New Route
// ========================
router.get("/new", (req, res) => {
  // res.send('testing new')
  res.render("new.ejs");
});


router.post("/", (req, res) => {
  Tracker.create(req.body, (error, createdTracker) => {
    res.redirect("/tracker/index");
  });
});

module.exports = router;
