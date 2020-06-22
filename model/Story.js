var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var storySchema = new Schema({

    imagePrimary:{
        type: String
    },
    imageSecondary:{
        type:String
    },
caption:{
type: String
},
date:{
    type: String
},
storyName:{
    type: String
}
});



var story = mongoose.model("story", storySchema);
module.exports = story;