//EXPRESS ROUTE
const express = require("express");
const router = express.Router();

//database
const Story = require("../model/Story");

//controller
const storiesController = require("../controller/storiesController");

//image upload
const upload = require("../uploads/multer");

const pagination = require("../utility/pagination");
//create stories
router.post("/post",upload.array('image'),storiesController.createStories);

router.get("/get/post",pagination.paginatedResult(Story) ,storiesController.getStories);

router.post("/comment",storiesController.addComment);

module.exports = router;