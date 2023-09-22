const express=require('express')
const router=express.Router()
const {body, validationResult} = require('express-validator')
const {aiSql,median,runSql,gptSql,runMySql} = require('../controller/ai')


router.post('/ai-sql',[],(req,res,next)=>{
    next()
},aiSql)

router.post('/run-sql',[],(req,res,next)=>{
    next()
},runSql)

router.post('/run-mysql',[],(req,res,next)=>{
    next()
},runMySql)
router.post('/gpt-sql',[],(req,res,next)=>{
    next()
},gptSql)

router.get('/median',[],(req,res,next)=>{
    next()
},median)




module.exports=router