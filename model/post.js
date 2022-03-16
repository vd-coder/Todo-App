const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({

    title:String,
    content: String,

})

const Blog = mongoose.model('Blog' , blogSchema);

module.exports = Blog;