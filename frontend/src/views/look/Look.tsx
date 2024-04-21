import {Descriptions,Button,Input,message,Table} from "antd"
import { ChangeEvent, useState} from "react"
import styles from "./look.module.scss"
import moment from 'moment';

const View = () => {
    const [lookname,setlookname] = useState("");
    const devicenamechange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setlookname(e.target.value);
    }

    const [newlookname,setnewlookname] = useState("");
    const newdevicenamechange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setnewlookname(e.target.value);
    }

    const [data_Source, setDataSource] = useState([]);

    const [placename,setplacename] = useState("");
    const [placelat,setplacelat] = useState("");
    const [placelon,setplacelon] = useState("");
    const [placedescription,setdescription] = useState("");

    const lookplace = async () => {
        const data = {place:lookname};
        fetch('http://localhost:8080/place/lookplace', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json()
                setplacename(data.place)
                setplacelat(data.lat)
                setplacelon(data.lon)
                setdescription(data.description)
                message.success("查询位置成功！");
            } else {
                message.error("没有查询到该位置！"); 
            }
        })
    }

    const showmessage = async () => {
        const data = {place:newlookname};
        fetch('http://localhost:8080/place/show', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                setDataSource(data.data);
                message.success("查询消息成功！");
            } else {
                message.error("没有查询到消息！"); 
            }
        })
    }
    
    const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '位置',
        dataIndex: 'place',
        key: 'place',
    },
    {
        title: '日期',
        dataIndex: 'day',
        key: 'day',
        render: (text:string) => moment(text).format('YYYY-MM-DD'),
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'C02浓度',
        dataIndex: 'co2',
        key: 'co2',
    },
    {
        title: '人数',
        dataIndex: 'people_num',
        key: 'people_num',
    },
    ];
      

    return(
        <div>
            <div className={styles.container}>
                <div className={styles.title}>查询位置信息</div>
                <span className={styles.label}>请输入位置名称：</span>
                <Input placeholder="位置名称" className={styles.input} onChange={devicenamechange}/>
                <Button type="primary" className={styles.button} onClick={lookplace}>查询</Button>
                <Descriptions className={styles.descriptions} column={2} bordered={true}>
                    <Descriptions.Item label="名称">{placename}</Descriptions.Item>
                    <Descriptions.Item label="纬度">{placelat}</Descriptions.Item>
                    <Descriptions.Item label="经度">{placelon}</Descriptions.Item>
                    <Descriptions.Item label="描述">{placedescription}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className={styles.container}>
                <div className={styles.title}>位置消息</div>
                <span className={styles.label}>请输入位置名称：</span>
                <Input placeholder="位置名称" className={styles.input} onChange={newdevicenamechange}/>
                <Button type="primary" className={styles.button} onClick={showmessage}>查询</Button>
                <Table dataSource={data_Source} columns={columns} className={styles.table} pagination={{pageSize:3,total: data_Source.length}}/>;
            </div>
        </div>
    )
}

export default View