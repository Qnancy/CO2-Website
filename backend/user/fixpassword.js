const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function fixpassword(){
  app.post("/user/fixpassword", (req, res) => {
    const password = req.body.password;
    const username = req.body.username;

    db.connection.query('UPDATE users SET password = ? WHERE user_name = ?', [password, username], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.affectedRows > 0) 
        {
          console.log('成功修改密码');
          res.status(200).json({message: '成功修改密码'});
        } 
        else 
        {
          console.log('修改密码失败');
          res.status(500).json({message: '修改密码失败' });
        }
      }
    });
  });
  return app;
}

module.exports = fixpassword;