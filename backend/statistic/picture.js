const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function getTitle(){
  app.get("/statistic/picture", (req, res) => {
    db.connection.query('SELECT title FROM picture ORDER BY id DESC LIMIT 1', (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.error('查询图片标题成功！');
          res.status(200).json({title:results[0].title,message: '查询图片标题成功'});
        } 
        else 
        { 
          console.error('查询图片标题失败！');
          res.status(402).json({message: '查询图片标题失败！' });
        }
      }
    });
  });
  return app;
}

module.exports = getTitle;