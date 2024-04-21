const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function showmessage(){
  app.post("/place/show", (req, res) => {
    const place = req.body.place;
    db.connection.query('SELECT * FROM messages WHERE place = ?', [place], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.log('成功获取信息');
          res.status(200).json({data:results,message: '成功获取信息'});
        } 
        else 
        {
          console.log('获取信息失败');
          res.status(401).json({message: '获取信息失败' });
        }
      }
    });
  });
  return app;
}

module.exports = showmessage;