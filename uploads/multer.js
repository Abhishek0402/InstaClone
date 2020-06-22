const multer= require('multer');

//storage engine
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

//validations
const fileFilter =(req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        //allow upload
                cb(null,true)  //true here means that there is no error
}
    else{
        //no allow upload
        cb({message:'Unsupported file format'},false) //false here means that there is a error and so do not upload
    }
}

const upload = multer({
    storage: storage,
    limits : {fieldSize: 1024 * 1024},
    fileFilter: fileFilter
})

module.exports = upload;