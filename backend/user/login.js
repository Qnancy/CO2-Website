const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function userlogin(){
  app.post("/user/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.connection.query('SELECT * FROM users WHERE user_name = ? AND password = ?', [username, password], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.log('用户名和密码匹配');
          const payload = { username: username };
          const secretKey = 'co2'; 
          const token = jwt.sign(payload, secretKey, { expiresIn:'24h'});
          res.status(200).json({code: 1, message: '登陆成功', token: token });
        } 
        else 
        {
          console.log('用户名和密码不匹配');
          res.status(401).json({ code: 0, message: '用户不存在或账号或密码错误' });
        }
      }
    });
  });
  return app;
}

module.exports = userlogin;