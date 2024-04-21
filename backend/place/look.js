const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function lookplace(){
  app.post("/place/look", (req, res) => {

    db.connection.query('SELECT * FROM places', (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.log('成功查询位置');
          res.status(200).json({data:results, message: '成功查询位置'});
        } 
        else 
        {
          console.log('查询位置失败');
          res.status(500).json({message: '查询位置失败' });
        }
      }
    });
  });
  return app;
}

module.exports = lookplace;