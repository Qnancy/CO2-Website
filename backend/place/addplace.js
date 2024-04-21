const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function addplace(){
  app.post("/place/add", (req, res) => {
    const place = req.body.place;
    const lat = req.body.lat;
    const lon = req.body.lon;
    const description = req.body.description;

    db.connection.query('SELECT * FROM places WHERE place = ?', [place], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length == 0) 
        {
          db.connection.query('INSERT INTO places (place,lat,lon,description) VALUES (?,?,?,?)', [place,lat,lon,description], (error, results) => {
            if (error) 
            {
              console.error('数据库查询出错:', error);
              res.status(500).json({ message: '服务器内部错误' });
            } 
            else 
            {
              if (results.affectedRows > 0) 
              {
                console.log('成功增加位置');
                res.status(200).json({message: '成功增加位置'});
              } 
              else 
              {
                console.log('增加位置失败');
                res.status(500).json({message: '增加位置失败' });
              }
            }
          });
        }
      } 
    });
  });

  return app;
}

module.exports = addplace;