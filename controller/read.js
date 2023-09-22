// const fs=require('fs')
// const processSource=fs.readFileSync('./controller/dispensing.json', { encoding: 'utf8'})
// console.log(processSource)


// const vm = require('vm');
// const code = 'console.log("Hello, World!")';
// vm.runInThisContext(code);

// let allProcessDispensing;

// 用 eval 执行
// eval(`
//   (async function(processName) {
//       allProcessDispensing = await Process.find({
//         process: processName,
//       });
//     })(processName);
// `);
let  allProcessDispensing
eval(`allProcessDispensing="123"`)
console.log(allProcessDispensing)