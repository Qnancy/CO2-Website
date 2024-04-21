const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function place(){
  app.post("/statistic/place", (req, res) => {
    const place = req.body.place;

    db.connection.query('SELECT place FROM places WHERE place = ?', [place], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.error('查询位置名称成功！');
          res.status(200).json({place:place,message: '查询位置名称成功'});
        } 
        else 
        { 
          console.error('查询位置失败！');
          res.status(402).json({message: '查询位置失败！' });
        }
      }
    });
  });
  return app;
}

module.exports = place;