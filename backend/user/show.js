const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function showuser(){
  app.post("/user/show", (req, res) => {
    const username = req.body.username;

    db.connection.query('SELECT * FROM users WHERE user_name = ?', [username], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.log('成功获取用户信息');
          res.status(200).json({password:results[0].password.toString(),email:results[0].email.toString(),message: '成功获取用户信息'});
        } 
        else 
        {
          console.log('获取用户信息失败');
          res.status(401).json({message: '用户不存在或账号或密码错误' });
        }
      }
    });
  });
  return app;
}

module.exports = showuser;