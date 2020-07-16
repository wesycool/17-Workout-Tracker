const router = require("express").Router();
const mongoose = require("mongoose");
const {Workout,Exercise} = require("../models/index.js");


router.get("/api/workouts", (req,res) =>{
    Workout.find({})
    .then( async dbWorkout => {
        let data = []

        for (const {exercises,_doc} of dbWorkout){
            const getDuration = async () => {
                let totalDuration = 0
                for (const id of exercises){
                    const {duration} = await Exercise.findById(mongoose.Types.ObjectId(id))
                    totalDuration += Number(duration)
                }
                return {..._doc, ...{totalDuration} }              
            }

            data.push( await getDuration() )
        }

        res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
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

})



router.get("/exercise", (req,res) => {
    res.sendfile("public/exercise.html")
})

module.exports = router;