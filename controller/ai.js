const { Process } = require("../model");
const axios = require('axios');
const url = 'https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_bosch_demo_0921_2/invoke';  
const token = 'eyJhbGciOiJIUzI1NiIsInNpZ25fdHlwZSI6IlNJR04iLCJ0eXAiOiJKV1QifQ.eyJhcGlfa2V5IjoiNjZlYTA2YmVmNDhkN2E1MDFiOGZhZDdhMTQ5ZTY5ZDgiLCJleHAiOjE3MDA0NzA4NzU5MTYsInRpbWVzdGFtcCI6MTY5NDQyMjg3NTkxNn0.SaT9IWmCYLTRVEJentKsuGXZxLhI9kkNnNg8WsFrdkw';


const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: '',
});



const mysql = require('mysql');





let answers = [];
function getRandomElementFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const randomElement = getRandomElementFromArray(answers);

const aiSql = async (req, res, next) => {
  const question = req.body.question;
  console.log(question);
  res.status(200).json({
    success: "success",
    // sql:`(async function(processName) {
    //     allProcessDispensing = await Process.find({
    //       process: processName,
    //     });
    //   })(processName);`
    sql: `  const filterSize = await Process.aggregate([
        {
          $match: {
            process: "dispensing",
            productSize: { $not: /^Φ/ },
          },
        },
        {
          $addFields: {
            dimensions: {
              $split: ["$productSize", "x"],
            },
          },
        },
        {
          $addFields: {
            dimensionsDouble: {
              $map: {
                input: "$dimensions",
                as: "dim",
                in: { $toDouble: "$$dim" },
              },
            },
          },
        },
        {
          $addFields: {
            volume: {
              $reduce: {
                input: "$dimensionsDouble",
                initialValue: 1,
                in: { $multiply: ["$$value", "$$this"] },
              },
            },
          },
        },
        {
          $match: {
            volume: { $lt: 800000 },
          },
        },
      ]);`,
  });
};

const median = async (req, res, next) => {
  // Step 1: 先找出符合条件的所有产品，并计算它们的体积。
  const allProducts = await Process.aggregate([
    {
      $match: {
        process: "dispensing",
        productSize: { $not: /^Φ/ },
      },
    },
    {
      $project: {
        dimensions: {
          $map: {
            input: { $split: ["$productSize", "x"] },
            as: "dim",
            in: { $convert: { input: "$$dim", to: "double", onError: 0.0 } },
          },
        },
      },
    },
    {
      $project: {
        volume: {
          $reduce: {
            input: "$dimensions",
            initialValue: 1,
            in: { $multiply: ["$$value", "$$this"] },
          },
        },
      },
    },
    {
      $sort: { volume: 1 },
    },
  ]);

  // Step 2: 找出中位数的位置。
  const total = allProducts.length;
  let medianPosition = Math.floor(total / 2);

  // Step 3: 找到中位数产品。
  const medianProduct = await Process.aggregate([
    {
      $match: {
        process: "dispensing",
        productSize: { $not: /^Φ/ },
      },
    },
    {
      $project: {
        dimensions: {
          $map: {
            input: { $split: ["$productSize", "x"] },
            as: "dim",
            in: { $convert: { input: "$$dim", to: "double", onError: 0.0 } },
          },
        },
        // 添加其他你想保留的字段
        process: 1,
        projectId: 1,
        sap: 1,
        productSize: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $project: {
        volume: {
          $reduce: {
            input: "$dimensions",
            initialValue: 1,
            in: { $multiply: ["$$value", "$$this"] },
          },
        },
        // 再次添加其他你想保留的字段
        process: 1,
        projectId: 1,
        sap: 1,
        productSize: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $sort: { volume: 1 },
    },
    {
      $skip: medianPosition,
    },
    {
      $limit: 1,
    },
  ]);

  console.log(medianProduct);
  res.status(200).json({
    success: "success",
    medianProduct,
  });
};

const runSql=async (req, res, next) => {
  try{
    let result

  let sql=req.body.sql
  console.log(sql)
  


  eval(`
    (async function() {
        result = ${sql}
        res.status(200).json({
          success: "success",
          sql:sql,
          result:result,
        });
    })();
  `);
  }catch(e){
    res.status(404).json({
      message: "err",
      err:e,
    });
  }
  
};

// const runMySql=async (req, res, next) => {
//   try{
//     let result

//   let sql=req.body.sql
//   console.log(sql)
//   const requestData = {
//     prompt: [{"role": "user", "content": `\n你是一个自然语言转SQL的生成器，根据自然语言直接输出SQL语句，不需要解释。\n表名和表字段如下：CREATE TABLE table_bosch (process VARCHAR(255) COMMENT '工艺类型，包含dispensing,screwing,forming,welding,press', projectId VARCHAR(255) COMMENT '项目id', sap VARCHAR(255) COMMENT 'sap 编号', productSizeLength INT COMMENT '产品尺寸（长度）', productSizeWidth INT COMMENT '产品尺寸（宽度）', productSizeHeight INT COMMENT '产品尺寸（高度）', description VARCHAR(255) COMMENT '项目描述', supplier VARCHAR(255) COMMENT '供应商', press_force INT COMMENT '压力', stroke INT COMMENT '行程', speed INT COMMENT '速度'); \n输入自然语言: ${sql}\n输出SQL:\n`}],

// };
// const axiosConfig = {
//   method: 'POST', 
//   url: url,
//   headers: {
//     'Authorization': `Bearer ${token}`, 
//     'Content-Type': 'application/json', 
//   },
//   data: requestData, 
// };
//   axios(axiosConfig)
//   .then(response => {
//     // Handle the data from the successful response
//     console.log(JSON.stringify(response.data.data.choices));
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Cool1234567890-',
//   database: 'bmg'
// });

//     connection.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');

//   // SQL query to select all data from the table
//   const selectQuery = response.data.data.choices[0]['content'].split('"')[1];

//   // Execute the select query
//   connection.query(selectQuery, (err, results) => {
//     if (err) {
//       console.error('Error selecting data:', err);
//     } else {
//       console.log('Selected data:');
//       console.log(results); // Log the query results
//           connection.end();


//       res.status(200).json({
//       success: "success",
//       sql:sql,
//       result:results,
//     });
//     }

//     // Close the MySQL connection
//   });
// });
    
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the request
//     console.error('Request failed:', error);
//   });

//   // eval(`
//   //   (async function() {
//   //       result = ${sql}
//   //       res.status(200).json({
//   //         success: "success",
//   //         sql:sql,
//   //         result:result,
//   //       });
//   //   })();
//   // `);
//   }catch(e){
//     res.status(404).json({
//       message: "err",
//       err:e,
//     });
//   }
  
// };




const runMySql=async (req, res, next) => {
  try{
    let result

  let sql=req.body.sql
  console.log(sql)

  let previousQuestions=req.body.previousQuestions
  console.log(previousQuestions)


  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-2024-04-09",
    messages: [
      {"role": "system", "content": `\nYou are a natural language to SQL generator that directly outputs SQL statements based on natural language input, no explanation needed.\n The Database is MySQL. Only one table called festo_round_cylinder in the database. The table name and fields are as follows: CREATE TABLE festo_round_cylinder (
        Stroke VARCHAR(255) COMMENT 'Stroke: 1 mm ... 200 mm',
        PistonDiameter VARCHAR(255) COMMENT 'Piston diameter: 25 mm',
        Cushioning VARCHAR(255) COMMENT 'Cushioning',
        MountingPosition VARCHAR(255) COMMENT 'Mounting position',
        Design VARCHAR(255) COMMENT 'Design',
        PositionDetection VARCHAR(255) COMMENT 'Position detection',
        Symbol VARCHAR(255) COMMENT 'Symbol',
        Variants VARCHAR(255) COMMENT 'Variants',
        OperatingPressureMPa VARCHAR(255) COMMENT 'Operating pressure: 0.06 MPa ... 1 MPa',
        OperatingPressureBar VARCHAR(255) COMMENT 'Operating pressure: 0.6 bar ... 10 bar',
        ModeOfOperation VARCHAR(255) COMMENT 'Mode of operation',
        OperatingMedium VARCHAR(255) COMMENT 'Operating medium',
        NoteOnOperatingAndPilotMedium VARCHAR(255) COMMENT 'Note on operating and pilot medium',
        CorrosionResistanceClassCRC VARCHAR(255) COMMENT 'Corrosion resistance class CRC: 0 - No corrosion stress',
        LABS_PWIS_Conformity VARCHAR(255) COMMENT 'LABS (PWIS) conformity',
        SuitabilityForTheProductionOfLi_ionBatteries VARCHAR(255) COMMENT 'Suitability for the production of Li-ion batteries',
        CleanroomClass VARCHAR(255) COMMENT 'Cleanroom class',
        AmbientTemperature VARCHAR(255) COMMENT 'Ambient temperature: -20 °C ... 80 °C',
        CushioningLength VARCHAR(255) COMMENT 'Cushioning length: 17 mm',
        TheoreticalForceAt0_6MPaReturnStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), return stroke: 247.4 N',
        TheoreticalForceAt0_6MPaAdvanceStroke VARCHAR(255) COMMENT 'Theoretical force at 0.6 MPa (6 bar, 87 psi), advance stroke: 294.5 N',
        MovingMassFor0mmStroke VARCHAR(255) COMMENT 'Moving mass for 0 mm stroke: 63.6 g',
        AdditionalMovingMassPer10mmStroke VARCHAR(255) COMMENT 'Additional moving mass per 10 mm stroke: 6 g',
        BasicWeightFor0mmStroke VARCHAR(255) COMMENT 'Basic weight for 0 mm stroke: 180.2 g',
        AdditionalWeightPer10mmStroke VARCHAR(255) COMMENT 'Additional weight per 10 mm stroke: 11 g',
        TypeOfMounting VARCHAR(255) COMMENT 'Type of mounting',
        PneumaticConnection VARCHAR(255) COMMENT 'Pneumatic connection: G1/8',
        NoteOnMaterials VARCHAR(255) COMMENT 'Note on materials: RoHS-compliant',
        MaterialCover VARCHAR(255) COMMENT 'Material cover',
        MaterialSeals VARCHAR(255) COMMENT 'Material seals',
        MaterialPistonRod VARCHAR(255) COMMENT 'Material piston rod',
        MaterialCylinderBarrel VARCHAR(255) COMMENT 'Material cylinder barrel',
        OrderCode VARCHAR(255) COMMENT 'Order code',
        Code VARCHAR(255) COMMENT 'Code',
        DataSheetLink VARCHAR(255) COMMENT 'Datasheet link',
        MannualLink VARCHAR(255) COMMENT 'Mannual link',
        ProductLink VARCHAR(255) COMMENT 'ProductLink'
    
    ); `},{"role":"user","content":`previous questions: ${previousQuestions}`},{
      "role":"user",
      "content":`Input natural language: ${sql}\nOutput SQL (I only need the pure SQL, don't add any other words or characters. Because I want to execute what you give me directly.):\n`
  
    }
    ],
    temperature: 0,
    top_p: 1,
  });


  console.log(response)

  // res.status(200).json({
  //   message: "success",
  //   response,
  // });

  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Cool1234567890-',
    database: 'bmg'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  
    // SQL query to select all data from the table
    // const selectQuery = response.data.data.choices[0]['content'].split('"')[1];
  
    // Execute the select query
    connection.query(response.choices[0].message.content, (err, results) => {
      if (err) {
        console.error('Error selecting data:', err);
      } else {
        console.log('Selected data:');
        console.log(results); // Log the query results
            connection.end();
  
  
        res.status(200).json({
          success: "success",
          sql:sql,
          result:results,
        });
      }
  
      // Close the MySQL connection
    });
  });




  }catch(e){
    res.status(404).json({
      message: "err",
      err:e,
    });
  }
  
};
const gptSql=async (req, res, next) => {
  
  let sql=req.body.sql
  console.log(sql)
  let result=`await Process.find({
    process: processName,
  });`
  


  res.status(200).json({
    success: "success",
    sql:sql,
    result,
  });
};

module.exports = {
  aiSql,
  median,
  runSql,
  gptSql,
  runMySql
};
