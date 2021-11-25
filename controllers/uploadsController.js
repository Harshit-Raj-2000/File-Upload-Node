const path = require('path')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


// using express-fileupload middleware, sets up the files coming in in req.files, it also provides a function in req.files -- mv to move the file to the desired location in the server

// after uploading the file we want to send the path of the uploaded image in the server  back, which will then be stored in the database
const uploadProductImage = async (req, res) =>{
    if( !req.files ){
        throw new CustomError.BadRequestError('No File Uploaded')
    }
    const productImage = req.files.image

    if( !(productImage.mimetype.startsWith('image'))){
        throw new CustomError.BadRequestError('Please Upload Image File')
    }

    const maxSize = 1024 * 1024;

    if( productImage.size > maxSize ){
        throw new CustomError.BadRequestError('Please upload image smaller than 1MB')
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)
    return res.status(StatusCodes.OK).json({image:{ src: `/uploads/${productImage.name}`}})
}

// check if file exists
// check format
// check size


module.exports = uploadProductImage