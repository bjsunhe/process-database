const mongoose=require('mongoose')
const baseModel=require('./base-model')

const questionSchema=new mongoose.Schema({
    ...baseModel,
    question:{
        type:String
    },
    router:{
        type:String
    }
})

module.exports=questionSchema