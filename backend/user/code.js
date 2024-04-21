const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

function generateVerificationCode() {
    // 生成 6 位验证码
    const codeLength = 6;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  }

function sendcode(){
    app.post("/user/code", (req, res) => {
      const emailname = req.body.email;
      const code = generateVerificationCode();

      const transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 587,
        secure: true, 
        auth: {
            user: 'mzy2060332545@163.com',
            pass: 'OSPSWOOWDDRFNGQV'
        }
      });

      const mailOptions = {
        from: 'mzy2060332545@163.com',
        to: emailname,
        subject: '验证码',
        text: `碳索智能二氧化碳在线监测平台通知：您的验证码是${code}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('发送邮件失败:', error);
          res.status(500).send('发送验证码失败');
        } else {
          console.log('邮件已发送:', info.response);
          res.status(200).send({code:code.toString(),message:'验证码已发送'});
        }
      });
    })

    return app;
}

  module.exports = sendcode;