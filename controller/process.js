const { Process, Question } = require("../model");
const fs = require("fs");
const vm = require("vm");

const saveProcess = async (req, res, next) => {
  // const opl=req.body.opl
  // const material=req.body.material
  const processSource = fs.readFileSync("./controller/screwing.json", {
    encoding: "utf8",
  });
  console.log(processSource);
  JSON.parse(processSource).projects.forEach(async (project) => {
    if (project.project) {
      let process = new Process({
        process: "screwing",
        projectId: project.project,
        sap: project.sap,
        productSize: project.product,
        description: project.description,
      });

      await process.save();
    }
  });

  res.status(200).json({
    success: "success",
  });
};

const countProcess = async (req, res, next) => {
  const processName = req.body.processName;

  //   let allProcess = await Process.find({
  //     process: processName,
  //   });

  let allProcessDispensing;

  // 用 eval 执行
  eval(`
    (async function(processName) {
        allProcessDispensing = await Process.find({
          process: processName,
        });
      })(processName);
  `);

  let allProcessDispensingSql=
  `await Process.find({
        process: processName,
  });`

  let count = await Process.count({ process: processName });
  let countSql=`await Process.count({ process: processName });`
  let process = await Process.distinct("process");
  let processSql=`await Process.distinct("process");`

  const processGroup = await Process.aggregate([
    {
      $group: {
        _id: "$process",
        count: { $sum: 1 },
      },
    },
  ]);
  let processGroupSql=`await Process.aggregate([
    {
      $group: {
        _id: "$process",
        count: { $sum: 1 },
      },
    },
  ]);`

  const filterSize = await Process.aggregate([
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
  ]);
  let filterSizeSql=`await Process.aggregate([
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
  ]);`;
  (async () => {
    const result = await Process.aggregate([
      {
        $match: {
          process: "dispensing",
          productSize: { $not: /^Φ/ },
        },
      },
      {
        $project: {
          productSize: 1,
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
          // 再次添加其他你想保畈的字段
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
        $limit: 1,
      },
      {
        $project: {
          // 在这里列出你想要的所有字段，以获取完整的文档信息
          process: 1,
          projectId: 1,
          sap: 1,
          productSize: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    console.log(result);
  })();

  (async () => {
    const result = await Process.aggregate([
      {
        $match: {
          process: "dispensing",
          productSize: { $not: /^Φ/ },
        },
      },
      {
        $project: {
          productSize: 1,
          dimensions: {
            $map: {
              input: { $split: ["$productSize", "x"] },
              as: "dim",
              in: { $convert: { input: "$$dim", to: "double", onError: 0.0 } },
            },
          },
          process: 1,
          projectId: 1,
          sap: 1,
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
        $sort: { volume: -1 }, // 改为降序
      },
      {
        $limit: 1,
      },
      {
        $project: {
          process: 1,
          projectId: 1,
          sap: 1,
          productSize: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    console.log(result);
  })();

  (async () => {
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
  })();

  res.status(200).json({
    allProcessDispensing,
    allProcessDispensingSql,
    count,
    countSql,
    process,
    processSql,
    processGroup,
    processGroupSql,
    filterSize,
    filterSizeSql
  });
};

const addQuestion = async (req, res, next) => {
  let question = new Question({
    question:req.body.question,
    router:''
  });
  console.log(question)
  await question.save();

  res.status(200).json({
    success: "success",
  });
};

const allQuestion = async (req, res, next) => {
  let question = await Question.find({
    
  });

  res.status(200).json({question})
};

module.exports = {
  saveProcess,
  countProcess,
  addQuestion,
  allQuestion,
};
