const User = require("../models/User");

const router = require("express").Router(); 

router.get('/', (req, res, next) => {
    User.find({role: 'therapist'})
      .then(users => {
        res.status(200).json(users)
      })
  });


  router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
       if (!user) {
          res.status(404).json(user)
        } else {
          res.status(200).json(user)
        }
      })
  });

  
  
  
  module.exports = router;