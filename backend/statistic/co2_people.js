const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function co2_people(){
  app.post("/statistic/co2_people", (req, res) => {
    const place = req.body.place;
    db.connection.query('SELECT co2, people_num, time FROM messages WHERE place = ?',[place], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.log('成功查询co2_people');
          res.status(200).json({data:results, message: '成功查询co2_people'});
        } 
        else 
        {
          console.log('查询co2_people失败');
          res.status(500).json({message: '查询co2_people失败' });
        }
      }
    });
  });
  return app;
}

module.exports = co2_people;