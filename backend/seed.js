const mongoose = require("mongoose")
const seeds = require("./seeds")


mongoose.connect('mongodb://localhost:27017/shopping-cart', {useNewUrlParser: true})
db = mongoose.connection

db.once('open', () => {
    Object.keys(seeds).forEach(key => {
        collection = db.collection(key)
        seeds[key].forEach(seed => {
            seed._id = new mongoose.Types.ObjectId()
            collection.updateOne(
                { _id: seed._id },
                {$set: seed},
                { upsert: true, forceServerObjectId: true },
                (err, result) => {
                    if (err) {
                        throw err
                    }
                }
            )
        })    
    })
})

db.close()