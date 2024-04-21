import { ChangeEvent, useEffect, useState} from "react"
import { Descriptions,Button,message,Modal,Input,Table} from 'antd';
import styles from "./user.module.scss"

const View = () => {
    const [isModalOpen_password, setIsModalOpen_password] = useState(false);
    const showModal_password = () => {
        setIsModalOpen_password(true);
    };
    const handleOk_password = () => {
        setIsModalOpen_password(false);
        fixpassword();
        showuser();
    };
    const handleCancel_password = () => {
        setIsModalOpen_password(false);
    };
    const [passwordVal1,setpasswordVal1] = useState("");
    const [passwordVal2,setpasswordVal2] = useState("");
    const [passwordVal3,setpasswordVal3] = useState("");
    const passwordChange1 = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setpasswordVal1(e.target.value);
    }
    const passwordChange2 = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setpasswordVal2(e.target.value);
    }
    const passwordChange3 = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setpasswordVal3(e.target.value);
    }

    const [isModalOpen_email, setIsModalOpen_email] = useState(false);
    const showModal_email = () => {
        setIsModalOpen_email(true);
    };
    const handleOk_email = () => {
        setIsModalOpen_email(false);
        fixemail();
        showuser();
    };
    const handleCancel_email = () => {
        setIsModalOpen_email(false);
    };
    const [emailVal,setemailVal] = useState("");
    const emailChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setemailVal(e.target.value);
    }
    
    const username = localStorage.getItem("username");
    const [password,setpassword] = useState("");
    const [email,setemail] = useState("");

    const showuser = async () => {
        const data = {username: username};

        fetch('http://localhost:8080/user/show', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                setpassword(data.password)
                setemail(data.email)
            }
        })
    }

    useEffect(() => {
        showuser();
        lookplace();
    }, []);

    const fixpassword = async () => {
        const data = {username: username,password: passwordVal2};
        if(passwordVal1 !== password)
        {
            message.error("原始密码错误！")
            return
        }
        if(passwordVal2 !== passwordVal3)
        {
            message.error("两次输入密码不一致！")
            return
        }
        fetch('http://localhost:8080/user/fixpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const result = await response.json();
                setpassword(result.password);
                message.success("修改密码成功！");
            } else {
                message.error("修改密码失败！"); 
            }
        })
    }

    const fixemail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(emailVal))
        {
            message.error("邮箱格式验证失败！")
            return
        }

        const data = {username:username,email:emailVal};
        fetch('http://localhost:8080/user/fixemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const result = await response.json();
                setemail(result.email);
                message.success("修改邮箱成功！");
            } else {
                message.error("修改邮箱失败！"); 
            }
        })
    }

    const columns = [
        {
            title: '位置',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: '纬度',
            dataIndex: 'lat',
            key: 'lat',
        },
        {
            title: '经度',
            dataIndex: 'lon',
            key: 'lon',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    const [data_Source, setDataSource] = useState([]);

    const lookplace = async () => {
        fetch('http://localhost:8080/place/look', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                setDataSource(data.data);
            } else {

            }
        })
    }

    return(
    <div className={styles.userinfocontainer}>
        <Descriptions title={<h3 className={styles.titleheading}>用户个人信息</h3>} column={2} bordered={true}>
            <Descriptions.Item label="用户名">{username}</Descriptions.Item>
            <Descriptions.Item label="密码">{password}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
            <Descriptions.Item label="学校">浙江大学</Descriptions.Item>
        </Descriptions>
        <div className={styles.actionbuttons}>
            <div className={styles.actionbutton}>
                <Button type="primary" className={styles.button} onClick={showModal_password}>修改密码</Button>
            </div>
            <Modal title="修改密码" open={isModalOpen_password} onOk={handleOk_password} onCancel={handleCancel_password}>
                <Input.Password placeholder="原始密码" onChange={passwordChange1} style={{ marginBottom: "20px" }}/>
                <Input.Password placeholder="新密码" onChange={passwordChange2} style={{ marginBottom: "20px" }}/>
                <Input.Password placeholder="再次输入新密码" onChange={passwordChange3} style={{ marginBottom: "20px" }}/>
            </Modal>
            <div className={styles.actionbutton}>
                <Button type="primary" className={styles.button} onClick={showModal_email}>修改邮箱</Button>
            </div>
            <Modal title="修改邮箱" open={isModalOpen_email} onOk={handleOk_email} onCancel={handleCancel_email}>
                <Input placeholder="新邮箱" onChange={emailChange} style={{ marginBottom: "20px" }}/>
            </Modal>
        </div>
        <div className={styles.titleheading}>位置信息</div>
        <Table dataSource={data_Source} columns={columns} className={styles.table} pagination={{pageSize:4,total: data_Source.length}}/>;
    </div>
    )
}

export default View