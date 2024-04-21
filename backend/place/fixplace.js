const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/database.js');

app.use(cors());
app.use(express.json());

function fixplace(){
  app.post("/place/fix", (req, res) => {
    const place = req.body.place;
    const lat = req.body.lat;
    const lon = req.body.lon;
    const description = req.body.description

    db.connection.query('SELECT * FROM places WHERE place = ?', [place], (error, results) => {
      if (error) 
      {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
      } 
      else 
      {
        if (results.length > 0) 
        {
          db.connection.query('UPDATE places SET lat = ?,lon = ?,description = ? WHERE place = ?', [lat,lon,description,place], (error, results) => {
            if (error) 
            {
              console.error('数据库查询出错:', error);
              res.status(500).json({ message: '服务器内部错误' });
            } 
            else 
            {
              if (results.affectedRows > 0) 
              {
                console.log('成功修改位置');
                res.status(200).json({message: '成功修改位置'});
              } 
              else 
              {
                console.log('用户不具有该权限');
                res.status(401).json({message: '用户不具有该权限' });
              }
            }
          });
        }
        else 
        {
          console.log('位置不存在');
          res.status(500).json({message: '位置不存在' });
        }
      } 
    });
  });

  return app;
}

module.exports = fixplace;