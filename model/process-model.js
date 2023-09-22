const mongoose=require('mongoose')
const baseModel=require('./base-model')

const processSchema=new mongoose.Schema({
    ...baseModel,
    process:{
        type:String
    },
    projectId:{
        type:String
    },
    sap:{
        type:String
    },
    productSize:{
        type:String
    },
    description:{
        type:String
    }
})

module.exports=processSchema