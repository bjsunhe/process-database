const xlsx2json=require('node-xlsx')
const {ProjectCost} = require('../model')

const addProjectCost=async (req,res,next)=>{
    // const list = xlsx2json.parse('../data/6755_VGW_V2.csv')
    // const projectList = xlsx2json.parse('../data/000_Focus_projects_input-SW.xlsx')
    // const proco=xlsx2json.parse('../data/ProCo_ATMO-3CN - template.xlsx')
    // const fromPjm=xlsx2json.parse('../data/pjm.xlsx')
    // const fromCtg=xlsx2json.parse('../data/ctg-test.xlsx')
    // let proCo=xlsx2json.parse('../data/ProCo_ATMO-3CN.xlsx')
    // let costList=[]
    // for(let i=0;i<list[0].data.length;i++){
    //     if(list[0].data[i].length>8&&list[0].data[i][2].trim()!=='WBS Element'){
    //         costList.push(list[0].data[i])
    //     }  diff, , apc+ obligo,  v-thek(forcast apc)

    // }
    // costList.forEach(async item=>{
    //     let cost={
    //         project:item[1],
    //         quantity:item[5],
    //         value:item[6]
            
    //     }

        
    // })

    // proCo=proCo[1].data.filter(item=>item[0]&&item[0].indexOf('M.') !== -1)
    res.status(200).json({
        success:'success',
        // costList:list,
        // projectList,
        // proco,
        fromPjm:0,
        fromCtg:0,
        proCo:0

    })
}

const projectList=async (req,res,next)=>{
    // const list = xlsx2json.parse('../project_list.CSV')
    const list = xlsx2json.parse('../data/000_Focus_projects_input-SW.xlsx')
    let projectList=[]
    
    
    res.status(200).json({
        success:'success',
        list:list[0]

    })
}
const findProjectCost=async (req,res,next)=>{
    const projectId=req.body.projectId
    

    res.status(200).json({
        materials:''
    })

}


module.exports={
    addProjectCost,
    findProjectCost,
    projectList
}