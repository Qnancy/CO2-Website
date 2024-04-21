const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function lookmap(){
  app.post("/map/find", (req, res) => {

    db.connection.query('SELECT p.place,p.lat,p.lon,MAX(m.co2) AS max_co2,AVG(m.co2) AS avg_co2,MAX(m.people_num) AS max_people FROM places p JOIN messages m ON p.place = m.place GROUP BY p.place;', (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          console.log('地图标记成功')
          res.status(200).json({data:results,message: '地图标记成功'});
        }
        else
        {
          console.log('地图标记失败')
          res.status(401).json({message: '地图标记失败'});
        }
      }
    }) 
  });
  return app;
}

module.exports = lookmap;