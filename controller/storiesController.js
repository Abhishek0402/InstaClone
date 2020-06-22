//for image uploade
const upload = require("../uploads/multer");
const cloudinary = require('../uploads/cloudinary');
const { array } = require("../uploads/multer");

//for time and date
var moment = require("moment");

//database
const Story = require("../model/Story");

const fs = require('fs');

exports.createStories = async (req, res) => {
    //input 
    var { caption, storyName } = req.body;
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    var files = req.files;
    var urls = [];
    //to check if the input already exists
    await Story.findOne({
        storyName
    }).then(async (storyExists) => {
        if (storyExists) {
            res.status(500).json({
                message: "story_exists"
            });
        }
        else {
            //story not exists so can upload new
            const uploader = async (path) => await cloudinary.uploads(path, 'images');

            if (req.method === 'POST') {
                for (const file of files) {
                    const { path } = file;
                    const newPath = await uploader(path);
                    urls.push(newPath);
                    fs.unlinkSync(path);
                }
                var imagePrimary = urls[0].url;
                var imageSecondary = urls[1].url;

                var newStory = new Story({
                    imagePrimary: imagePrimary,
                    imageSecondary: imageSecondary,
                    caption,
                    date,
                    storyName
                });
                newStory.save().then(saved => {
                    res.status(200).json({
                        message: "image uploaded",
                        imagePrimary,
                        imageSecondary,
                        caption,
                        date,
                        storyName
                    });
                }).catch(err => console.log(err));
            }
            else {
                res.status(405).json({
                    err: "images_not_uploaded"
                })
            }
}
    }).catch(err => console.log(err));
};

exports.getStories = (req, res) => {
    res.status(200).json(res.paginatedResult);
}

exports.addComment = (req, res, next) => {
    var { comment, storyName } = req.body;
    Story.findOne({ storyName }).then(storyFound => {
        if (storyFound) {
            storyFound.commentList.push({
                comment: comment
            })
            storyFound.save().then(commentAdded => {
                res.status(200).json({
                    message: "comment_added"
                });
            }).catch(err => console.log(err));
        }
        else {
            res.status(500).json({
                message: "story_not_found"
            })
        }
    }).catch(err => console.log(err));
};