const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function fixemail(){
  app.post("/user/fixemail", (req, res) => {
    const email = req.body.email;
    const username = req.body.username;

    db.connection.query('UPDATE users SET email = ? WHERE user_name = ?', [email, username], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.affectedRows > 0) 
        {
          console.log('成功修改邮箱');
          res.status(200).json({message: '成功修改邮箱'});
        } 
        else 
        {
          console.log('修改邮箱失败');
          res.status(500).json({message: '修改邮箱失败' });
        }
      }
    });
  });
  return app;
}

module.exports = fixemail;