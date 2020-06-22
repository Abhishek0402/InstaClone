//EXPRESS ROUTE
const express = require("express");
const router = express.Router();

const story = require("../model/Story");
const storiesController = require("../controller/storiesController");

const upload = require("../uploads/multer");


//create stories
router.post("/post",upload.array('image'),storiesController.createStories);

router.get("/get/post",paginatedResult(story) ,storiesController.getStories);


function paginatedResult(model) {
    return async(req,res,next) =>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results ={}; 
        
        if(endIndex< model.length){
            results.next ={
                page: page+1,
                limit:limit
            }
        }
         if(startIndex>0){
            results.previous ={
                page:page-1,
                limit:limit
            }
        }
    try{
        results.list =await model.find().limit(limit).skip(startIndex).exec();
        res.paginatedResult = results;
next();
    }
    catch (e){
res.status(500).json({
    message:e.message
})
    }
    }
}
module.exports = router;