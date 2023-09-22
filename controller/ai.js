const { Process } = require("../model");
const axios = require('axios');
const url = 'https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_bosch_demo_0921_2/invoke';  
const token = 'eyJhbGciOiJIUzI1NiIsInNpZ25fdHlwZSI6IlNJR04iLCJ0eXAiOiJKV1QifQ.eyJhcGlfa2V5IjoiNjZlYTA2YmVmNDhkN2E1MDFiOGZhZDdhMTQ5ZTY5ZDgiLCJleHAiOjE3MDA0NzA4NzU5MTYsInRpbWVzdGFtcCI6MTY5NDQyMjg3NTkxNn0.SaT9IWmCYLTRVEJentKsuGXZxLhI9kkNnNg8WsFrdkw';


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

const runMySql=async (req, res, next) => {
  try{
    let result

  let sql=req.body.sql
  console.log(sql)
  const requestData = {
    prompt: [{"role": "user", "content": `\n你是一个自然语言转SQL的生成器，根据自然语言直接输出SQL语句，不需要解释。\n表名和表字段如下：CREATE TABLE table_bosch (process VARCHAR COMMENT '工艺类型，包含dispensing,screwing,forming,welding四种', projectId VARCHAR COMMENT '项目id', sap VARCHAR COMMENT 'sap 编号', productSizeLength INT COMMENT '产品尺寸（长度）, productSizeWidth INT COMMENT '产品尺寸（宽度）, productSizeHeight INT COMMENT '产品尺寸（高度）, description VARCHAR COMMENT '项目描述') \n输入自然语言: ${sql}\n输出SQL:\n`}],

};
const axiosConfig = {
  method: 'POST', 
  url: url,
  headers: {
    'Authorization': `Bearer ${token}`, 
    'Content-Type': 'application/json', 
  },
  data: requestData, 
};
  axios(axiosConfig)
  .then(response => {
    // Handle the data from the successful response
    console.log(JSON.stringify(response.data.data.choices));
const connection = mysql.createConnection({
  host: 'localhost',
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
  const selectQuery = response.data.data.choices[0]['content'].split('"')[1];

  // Execute the select query
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error selecting data:', err);
    } else {
      console.log('Selected data:');
      console.log(results); // Log the query results

      res.status(200).json({
      success: "success",
      sql:sql,
      result:results,
    });
    }

    // Close the MySQL connection
    connection.end();
  });
});
    
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Request failed:', error);
  });

  // eval(`
  //   (async function() {
  //       result = ${sql}
  //       res.status(200).json({
  //         success: "success",
  //         sql:sql,
  //         result:result,
  //       });
  //   })();
  // `);
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
