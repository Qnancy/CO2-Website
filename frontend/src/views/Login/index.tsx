import { ChangeEvent, useEffect, useState} from "react"
import {message,Input,Space,Button} from 'antd';
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss"
import initLoginBg from "./init.ts"

const view = ()=>{
    let navigate = useNavigate()
    useEffect(()=>{
        initLoginBg();
        window.onresize = function(){initLoginBg()};
    },[]);

    const [usernameVal,setusernameVal] = useState("");
    const [passwordVal,setpasswordVal] = useState("");

    const usernameChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setusernameVal(e.target.value);
        localStorage.setItem("username",e.target.value);
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setpasswordVal(e.target.value);
        localStorage.setItem("password",e.target.value);
    }

    const gologin = async () => {
        const data = {
          username: usernameVal,
          password: passwordVal
        };
        
        if(!usernameVal.trim() || !passwordVal.trim())
        {
            message.warning("请输入完整信息！")
            return;
        }
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('token', result.token);
                message.success("登录成功");
                navigate("/HomePage");
            } else {
                message.error("用户名或密码错误！"); 
            }
        })
    }
    
    const goregister = () =>{
        navigate("/register")
    }

    return (
        <div className={styles.loginPage} style={{ backgroundColor: 'black'}}>
            <canvas id="canvas" style={{display:"block"}}></canvas>
            <div className={styles.loginBox+ " loginbox"}> 
                <div className="form">
                    <Space direction="vertical" size="large" style={{display:'flex'}}>
                    <h1>碳索智能二氧化碳在线监测平台</h1>
                    <Input placeholder="用户名" onChange={usernameChange}/>
                    <Input.Password placeholder="密码" onChange={passwordChange}/>
                    <Button type="primary" block className={styles.button} onClick={gologin}>登录</Button>
                    <Button type="primary" block className={styles.button} onClick={goregister}>注册</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default view