import { ChangeEvent, useEffect, useState} from "react"
import {message,Input,Space,Button,Row, Col,} from 'antd';
import { useNavigate } from "react-router-dom";
import styles from "./register.module.scss"
import initLoginBg from "./init.ts"

const view = ()=>{
    let navigate = useNavigate()
    useEffect(()=>{
        initLoginBg();
        window.onresize = function(){initLoginBg()};
    },[]);

    const [usernameVal,setusernameVal] = useState("");
    const [passwordVal1,setpasswordVal1] = useState("");
    const [passwordVal2,setpasswordVal2] = useState("");
    const [emailVal,setemailVal] = useState("");
    const [codeVal,setcodeVal] = useState("");
    const [real_code,setreal_codeVal] = useState("");

    const usernameChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setusernameVal(e.target.value);
    }
    const passwordChange1 = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setpasswordVal1(e.target.value);
    }
    const passwordChange2 = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setpasswordVal2(e.target.value);
    }
    const emailChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setemailVal(e.target.value);
    }
    const codeChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setcodeVal(e.target.value);
    }
    
    const tologin = () => {
        message.success("成功返回登录界面！")
        navigate("/login")
    }

    const getcode = async() => {
        fetch('http://localhost:8080/user/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:emailVal})
        })
       
        .then(async response => {
            if(response.ok){
                const data = await response.json();
                setreal_codeVal(data.code)
                message.success("验证码已发送！");
            } else { 
                message.error("验证码发送失败！"); 
            }
        })
    }

    const goregister = async () => {
        const data = {
          username: usernameVal,
          password: passwordVal1,
          email:emailVal,
          code:codeVal
        };
        
        if(!usernameVal.trim() || !passwordVal1.trim() || !passwordVal2.trim() || !emailVal.trim() || !codeVal.trim())
        {
            message.warning("请输入完整信息！")
            return
        }

        if(passwordVal1.trim() !== passwordVal2.trim()){
            message.warning("输入密码不一致！")
            return
        }

        if(usernameVal.length < 7 || passwordVal1.length < 7){
            message.warning("用户名和密码必须大于6字节！")
            return
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(emailVal))
        {
            message.error("邮箱格式验证失败！")
            return
        }

        if(codeVal !== real_code){
            message.error("验证码错误！")
            return
        }

        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                message.success("注册成功！");
                navigate("/login");
            } else {
                message.error("注册失败！"); 
            }
        })
    }

    return (
        <div className={styles.registerPage} style={{ backgroundColor: 'black'}}>
            <canvas id="canvas" style={{display:"block"}}></canvas>
            <div className={styles.registerBox+ " registerbox"}> 
                <div className="form">
                    <Space direction="vertical" size="large" style={{display:'flex'}}>
                    <h1>用户注册</h1>
                    <Input placeholder="用户名" onChange={usernameChange}/>
                    <Input.Password placeholder="输入密码" onChange={passwordChange1}/>
                    <Input.Password placeholder="请再次输入密码" onChange={passwordChange2}/>
                    <Input placeholder="邮箱" onChange={emailChange}/>
                    <Row align="middle" justify="center" gutter={[8, 0]}>
                        <Col>
                            <Input placeholder="验证码" className={styles.custominput} onChange={codeChange}/>
                        </Col>
                        <Col>
                            <Button type="primary" className={styles.custombutton} onClick={getcode}>获取验证码</Button>
                        </Col>
                    </Row>
                    <Button type="primary" block className={styles.button} onClick={goregister}>注册</Button>
                    <Button type="primary" block className={styles.button} onClick={tologin}>返回</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default view