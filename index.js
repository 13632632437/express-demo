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
app.get("/user", (req, res) => {
    res.send({
        username: 'zhangsan',
        age: 18,
        sex: 1,
        avatar: "http://skintest.hetyj.com/30869/e0ae3ef163e1f251cd9313b1e285058b.jpeg",
        phone: 13632632437,
        email: '1107410953@163.com',
        dec: "性别sex0是女,1就是男哦"
    })
})
app.listen(80, "127.0.0.1", () => {
    console.log("服务已在127.0.0.1启动")
})