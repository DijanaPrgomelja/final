const express = require('express');
const router = express.Router();

const User = require('../models/Reviews');
//const Review = require('../models/Review');

const fileUploader = require('../config/cloudinary');
const { response } = require('express');
const { populate } = require('../models/User');

router.post('/upload', fileUploader.single('imageURL'), (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.json({ secure_url: req.file.path });
  });

  router.post(
    '/profile-picture/update',
    fileUploader.single('imageURL'),
    (req, res, next) => {
      if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
      // get the URL of the uploaded file and send it as a response.
      // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
      res.json({ secure_url: req.file.path });
    }
  );
  

  module.exports = router;