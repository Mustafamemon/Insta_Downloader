const express = require('express');
const controller = require('../controller/download')

const router = express.Router();

router.get("/insta" , controller.instaDownloader);
router.get("/youtube" , controller.yotubeDownloader);

module.exports = router; 



 

 
