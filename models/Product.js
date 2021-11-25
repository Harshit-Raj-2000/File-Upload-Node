const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Provide name']
    },
    price:{
        type: Number,
        required: [true, 'Please Provide price']
    },
    image:{
        type: String,
        required: [true, 'Please Provide image']
    },

})


module.exports = mongoose.model('Product', ProductSchema)