// 引入express
const express = require("express")
// 创建实例
const app = express()


// 设置路由
app.get("/",(req,res)=>{
  res.send("Hello WZJ!")
})


// 设置端口
const port = process.env.PORT || 9527;



// 监听端口
app.listen(port,()=>{
  console.log(`Server running on port ${[port]}`);  
})