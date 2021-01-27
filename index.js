// 模块化路由主文件
const express = require("express");
const app = express();
const bodyparser = require("body-parser")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username !== "zhangsan" || password !== "123456") {
        res.status(400).send({
            code: 1,
            message: "用户名或密码错误"
        })
    } else {
        res.send({
            code: 0,
            message: "登录成功"
        })
    }
})
app.listen(80, "127.0.0.1", () => {
    console.log("服务已在127.0.0.1启动")
})