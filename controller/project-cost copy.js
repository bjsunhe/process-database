const xlsx2json=require('node-xlsx')
const {ProjectCost} = require('../model')

const addProjectCost=async (req,res,next)=>{
    const list = xlsx2json.parse('../6755_CJI3.CSV')
    let costList=[]
    for(let i=0;i<list[0].data.length;i++){
        if(list[0].data[i].length>8&&list[0].data[i][2].trim()!=='WBS Element'){
            costList.push(list[0].data[i])
        }

    }
    costList.forEach(async item=>{
        let cost={
            project:item[1],
            quantity:item[5],
            value:item[6]
            
        }

        let CostDB=new ProjectCost(cost)

        await CostDB.save()
    })
    res.status(200).json({
        success:'success',
        costList

    })
}

const projectList=async (req,res,next)=>{
    // const list = xlsx2json.parse('../project_list.CSV')
    const list = xlsx2json.parse('../000_Focus_projects_input-SW.xlsx')
    let projectList=[]
    
    
    res.status(200).json({
        success:'success',
        list:list[0]

    })
}
const findProjectCost=async (req,res,next)=>{
    const projectId=req.body.projectId
    let materials=await ProjectCost.find({
        project:projectId
    })

    res.status(200).json({
        materials
    })

}


module.exports={
    addProjectCost,
    findProjectCost,
    projectList
}