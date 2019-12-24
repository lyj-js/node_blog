const express = require('express')

// 本次 http 请求实例

const app = express()

app.use((req,res,next) => {
    console.log('请求开始', req.method,req.url)
})
app.use((req,res,next)=> {
    req.cookie = {
        userId: 'abc123'
    }
    next()
})
app.use((req,res, next)=> {
    // 假设处理 post data
    // 异步
    setTimeout(()=> {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
})
app.use('/api',(req,res,next)=> {
    console.log('处理 /api 路由')
    next()
})
app.get('/api',(req,res,next)=> {
    console.log('get /api 路由')
    next()
})
app.post('/api',(req,res,next)=> {
    console.log('post /api 路由')
    next()
})
app.get('/api/get-cookie',(req,res,next)=> {
    console.log('get /api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})
app.post('/api/get-post-cookie',(req,res,next)=> {
    console.log('get /api/get-post-cookie')
    res.json({
        errno: 0,
        data: req.body
    })
})
app.use((req,res,next)=> {
    console.log('处理 404')
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})
app.listen(3030, ()=> {
    console.log('server is running on port 3030')
})