const mongoose = require("mongoose")
const express = require('express')
const router = express.Router()
const Books = require('../models/Books')

router.route('/all-books').get((req, res) => {
    Books.find((err, books) => {
        if(err){
            throw err
        }
        else{
            res.json(books)
        }
    })
})

module.exports = router