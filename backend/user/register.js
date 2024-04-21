const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function userregister(){
  app.post("/user/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    db.connection.query('SELECT * FROM users WHERE user_name = ? OR email = ?', [username,email], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.log('用户名不唯一');
          res.status(400).json({message: '用户不唯一'});
        } 
        else 
        {
            db.connection.query('INSERT INTO users (user_name,password,email) VALUES (?,?,?)', [username,password,email], (error, results) => {
                if (error) {
                  // 处理错误情况
                  console.error('插入数据失败:', error);
                  res.status(401).json({message:'插入数据失败'});
                } else {
                  // 处理成功情况
                  console.log('插入数据成功');
                  res.status(200).json({message:'插入数据成功'});
                }
            });
        }
      }
    });
  });
  return app;
}

module.exports = userregister;