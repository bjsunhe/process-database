// const mongoose=require('mongoose')
// const {dbUri} = require('../config/config.default')

// const materialDeliverySchema=require('./material-delivery-model')
// const oplMaterialBindingSchema=require('./opl-material-binding')
// const projectCostSchema=require('./project-cost-model')
// const processSchema=require('./process-model')
// const questionSchema=require('./question')

// mongoose.connect(dbUri,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })


// const db=mongoose.connection


// db.on('open',()=>{
//     console.log('open')
// })


// module.exports={
//     MaterialDelivery:mongoose.model('MaterialDelivery',materialDeliverySchema),
//     OplMaterialBinding:mongoose.model('OplMaterialBinding',oplMaterialBindingSchema),
//     ProjectCost:mongoose.model('ProjectCost',projectCostSchema),
//     Process:mongoose.model('Process',processSchema),
//     Question:mongoose.model('Question',questionSchema)
// }
