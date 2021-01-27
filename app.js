// 引入express框架
const express = require("express");
// 读取文件的模块
const fs = require("fs");
// 异步回调方法改成返回 Promise 实例的方法的模块
const promisify = require("util").promisify;
const readFile = promisify(fs.readFile);

// 创建服务
const app = express();
// 匹配所有的请求
// app.use((req,res,next)=>{
//     console.log(req.url);
//     next()
// })
app.use("/login", (req, res, next) => {
    let isLogin = false;
    if (isLogin) {
        next()
    } else {
        res.send("你还没有登录")
    }
})
app.get("/", (req, res) => {
    /**
     * send()
     * 1. send方法内部会自动检测响应内容的类型
     * 2. send方法会自动设置http状态码
     * 3. send方法会自动设置响应类型和编码
     */
    res.send("这是一个寂寞的天")

})
app.get("/list", (req, res) => {
    res.send({ name: "zs", age: 18 })
})

app.get("/request", (req, res, next) => {
    req.name = "ls"
    next()
})

app.get("/request", (req, res) => {
    res.send(req.name)
})
// 抛出错误的路由
app.get("/err", (req, res, next) => {
    // throw new Error("服务器异常")
    // 异步抛出的错误
    setTimeout(() => {
        next(new Error("服务器异常"));
    }, 500)
})
// 读取文件错误抛出异常
app.get("/read", async (req, res, next) => {
    // 读取了一个不存在的文件
    try {
        await readFile("./abc.js")
    } catch (err) {
        next(err)
    }
})
// 添加404页面
app.use((req, res) => {
    // 修改状态码
    res.status(404).send("404")
})
//错误处理(只能捕获到同步代码抛出的错误，异步的错误需要在路由中调用next方法传入错误信息)
app.use((err, req, res, next) => {
    // err.message抛出的错误信息
    res.status(500).send(err.message)
})
// 监听端口
app.listen(80, (err) => {
    if (!err) {
        console.log("服务已启动！");
    } else {
        console.log("服务启动失败！");
    }
})