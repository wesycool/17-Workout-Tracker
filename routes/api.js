const router = require("express").Router();
const mongoose = require("mongoose");
const {Workout,Exercise} = require("../models/index.js");


router.get("/api/workouts", (req,res) =>{
  Workout.find({})
  .populate('exercises')
  .then(dbWorkout => {
    let data = []
    
    for(const {exercises,_doc} of dbWorkout){
      const totalDuration = exercises.map( ({duration}) => duration).reduce( (acc, cur) => acc + cur )
      data = [...data, { ..._doc, totalDuration } ]
    }
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  });

})


router.put("/api/workouts/:id", ({body,params},res) =>{
    Exercise.create(body)
    .then(({_id}) => Workout.findOneAndUpdate({_id: mongoose.Types.ObjectId(params.id) }, { $push: { exercises: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });

})


router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
    .populate('exercises')
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
})



router.get("/exercise", (req,res) => {
    res.sendfile("./public/exercise.html")
})

router.get("/stats", (req,res) => {
    res.sendfile("./public/stats.html")
})

module.exports = router;