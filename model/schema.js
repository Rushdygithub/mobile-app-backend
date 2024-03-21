const mongoose = require('mongoose')
const {schema} = mongoose


const socialSchema = new schema({

    userId: {
        type: String,
        require: true
    },
    description: {
        type:String
    },
    image: {
        type:String
    },
    likes: {
        type: Array,
        default: []
    },
},
    {
        timestamps:true
    }
)

module.exports = mongoos.model('Post', socialSchema)