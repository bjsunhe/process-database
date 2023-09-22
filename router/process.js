const express=require('express')
const router=express.Router()
const {body, validationResult} = require('express-validator')
const {saveProcess,countProcess,addQuestion,allQuestion} = require('../controller/process')


router.get('/save-process',[],(req,res,next)=>{
    next()
},saveProcess)

router.post('/count-process',[],(req,res,next)=>{
    next()
},countProcess)

router.post('/add-question',[],(req,res,next)=>{
    next()
},addQuestion)


router.post('/all-question',[],(req,res,next)=>{
    next()
},allQuestion)


module.exports=router