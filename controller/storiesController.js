const upload = require("../uploads/multer");
const cloudinary = require('../uploads/cloudinary');
var moment = require("moment");
//db
const Story = require("../model/Story");

const fs = require('fs');
const { array } = require("../uploads/multer");


exports.createStories =
    async (req, res) => {
        const uploader = async (path) => await cloudinary.uploads(path, 'images')

        if (req.method === 'POST') {
            var urls = [];
            var caption = req.body.caption;
            const date = moment().format('MMMM Do YYYY, h:mm:ss a');
            const files = req.files;
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
                date
            });
            newStory.save().then(saved => {
                res.status(200).json({
                    message: "image uploaded",
                    imagePrimary,
                    imageSecondary,
                    caption,
                    date
                });
            }).catch(err => console.log(err));
        }
        else {
            res.status(405).json({
                err: "images not uploaded"
            })
        }

    };

exports.getStories = (req,res) =>{
   res.status(200).json(res.paginatedResult);
}

