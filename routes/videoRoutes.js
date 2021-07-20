const express = require("express");
const router = express.Router();
const VideosController = require("../controllers/videoController");

router.get("/", VideosController.videosList);
router.get("/videoDetails/:videoId", VideosController.videoDetails);
router.put("/videosListUpdate", VideosController.videosListUpdate);

module.exports = router;
