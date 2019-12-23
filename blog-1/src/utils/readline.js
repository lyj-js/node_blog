const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname,'../','../','logs', 'access.log')
// 创建 read stream
console.log(fileName)

const readStream = fs.createReadStream(fileName)
readStream.on('data',chunk => {
    console.log('hahha:'+chunk.toString())
})
readStream.on('end',()=> {
    console.log('copy done')
})
// 创建 readline 对象

const rl = readline.createInterface({
    input: readStream
})
let chromeNum = 0;

let sum = 0

// 逐行读取
rl.on('line', (lineData) => {
    console.log(lineData)
    if(!lineData) {
        return
    }
    // 记录总行数
    sum++

    const arr = lineData.split('--') 
    if(arr[2]&&arr[2].indexOf('Chrom') > 0) {
        // 累加 chrome 的数量
        chromeNum ++ 
    }
})
// 监听读取完成

rl.on('close', () => {
    console.log(chromeNum)
    console.log(sum)
    console.log('chrome 占比:' + chromeNum/sum)
})