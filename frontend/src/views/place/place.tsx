import { Button,Input} from "antd"
import { ChangeEvent,useState} from "react"
import {message,Modal} from "antd"
import styles from "./place.module.scss"

const View = () => {
    const [placename,setplacename] = useState("");
    const [placelon,setplacelon] = useState("");
    const [placelat,setplacelat] = useState("");
    const [placedescription,setplacedescription] = useState("");
    const placenameChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setplacename(e.target.value);
    }
    const placelonChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setplacelon(e.target.value);
    }
    const placelatChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setplacelat(e.target.value);
    }
    const placedescriptionChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setplacedescription(e.target.value);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        addplace();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const [newplacename,setnewplacename] = useState("");
    const [newplacelat,setnewplacelat] = useState("");
    const [newplacelon,setnewplacelon] = useState("");
    const [newplacedescription,setnewplacedescription] = useState("");
    const newplacenameChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setnewplacename(e.target.value);
    }
    const newplacelatChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setnewplacelat(e.target.value);
    }
    const newplacelonChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setnewplacelon(e.target.value);
    }
    const newplacedescriptionChange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setnewplacedescription(e.target.value);
    }

    const fixplace = async () => {
        const data = {place:placename,lat:placelat,lon:placelon,description:placedescription};
        fetch('http://localhost:8080/place/fix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                message.success("修改位置成功！");
            } 
            else if(response.status === 401) {
                message.error("用户不具有该权限！"); 
            }
            else{
                message.error("修改位置失败！"); 
            }
        })
    }

    const addplace = async () => {
        if(newplacename == "" || newplacelat == "" || newplacelon == "" || newplacedescription == "")
        {
            message.error("请输入完整信息！")
            return;
        }
        const data = {place:newplacename,lat:newplacelat,lon:newplacelon,description:newplacedescription};
        fetch('http://localhost:8080/place/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                message.success("增加位置成功！");
            } else {
                message.error("位置名重复！"); 
            }
        })
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>位置配置信息修改</div>
            <div className={styles.inputWrapper}>
                <span className={styles.label}>请输入位置名称：</span>
                <Input placeholder="位置名称" className={styles.input} onChange={placenameChange}/>
            </div>
            <div className={styles.selectWrapper}>
                <span className={styles.label}>请输入位置纬度：</span>
                <Input placeholder="位置纬度" className={styles.input} onChange={placelatChange}/>
            </div>
            <div className={styles.selectWrapper}>
                <span className={styles.label}>请输入位置经度：</span>
                <Input placeholder="位置经度" className={styles.input} onChange={placelonChange}/>
            </div>
            <div className={styles.selectWrapper}>
                <span className={styles.label}>请输入位置描述：</span>
                <Input placeholder="位置描述" className={styles.input} onChange={placedescriptionChange}/>
            </div>
            <div className={styles.buttonWrapper}>
                <div>
                    <Button type="primary" className={styles.button} onClick={fixplace}>修改位置</Button>
                    <Button type="primary" className={styles.button} onClick={showModal}>新增位置</Button>
                    <Modal title="新增位置" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder="位置名称" className={styles.modalInput} onChange={newplacenameChange}/>
                        <Input placeholder="位置纬度" className={styles.modalInput} onChange={newplacelatChange}/>
                        <Input placeholder="位置经度" className={styles.modalInput} onChange={newplacelonChange}/>
                        <Input placeholder="位置描述" className={styles.modalInput} onChange={newplacedescriptionChange}/>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default View