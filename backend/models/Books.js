const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookSchema = new Schema({
    uid: String,
    title: String,
    description: String,
    metadata: {
        authors: [{
            name: String
        }]
    },
    price: Number,
    thumbnailLink: String,
    type: String
},{
    collection: 'books'
})

bookSchema.index({'uid': 'text', 'title': 'text', 'description': 'text'})

module.exports = mongoose.model('Books', bookSchema)
