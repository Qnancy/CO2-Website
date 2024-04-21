import {Button,Input,message} from 'antd';
import {useEffect, useState,ChangeEvent} from "react"
import styles from "./data.module.scss"
import { BarChart, Bar, Line, Label, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const View = () => {
    const [lookname,setlookname] = useState("");
    const namechange = (e:ChangeEvent<HTMLInputElement>)=>
    {
        setlookname(e.target.value);
    }

    const [name,setname] = useState("");

    const [co2,setco2] = useState([]);
    const [people,setpeople] = useState([]);
    const [time,settime] = useState([]);
    const [data1,setdata1] = useState([[]]);
    const [data2,setdata2] = useState([[]]);
    let binnedCO2 = {};
    let binnedpeople = {};

    useEffect(() => {
        co2_people()
    }, [name]);
 
    const lookplace = async () => {
        const data = {place:lookname};
        fetch('http://localhost:8080/statistic/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                setname(data.place)
                message.success("查询位置成功！");
            } else {
                message.error("没有查询到该位置！"); 
            }
        })
    }

    const co2_people = async () => {
        const data = {place:name};
        fetch('http://localhost:8080/statistic/co2_people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                const co2Data = data.data.map((item: { co2: number }) => item.co2);
                const peopleData = data.data.map((item: { people_num: number }) => item.people_num);
                const timeData = data.data.map((item: { time: string }) => item.time);
                setco2(co2Data);
                setpeople(peopleData);
                settime(timeData);
                createBinnedCO2(co2Data)
                createBinnedpeople(peopleData)
            } else {

            }
        })
    }

    function createBinnedCO2(co2: number[]) 
    {
        const binSize = 100;
    
        co2.forEach(value => {
            let index = Math.floor(value / binSize) * binSize;
        
            if (!binnedCO2[index]) {
                binnedCO2[index] = { co2: index, count: 0 };
            }
        
            binnedCO2[index].count += 1;
        });

        setdata1(Object.values(binnedCO2))
    }

    function createBinnedpeople(people: number[]) 
    {
        const binSize = 10;
    
        people.forEach(value => {
            let index = Math.floor(value / binSize) * binSize;
        
            if (!binnedpeople[index]) {
                binnedpeople[index] = { people: index, count: 0 };
            }
        
            binnedpeople[index].count += 1;
        });

        setdata2(Object.values(binnedpeople))
    }

    const screenWidth = window.innerWidth > 768 ? 600 : 300;
    const screenHeight = screenWidth == 600 ? 300 : 210;

    return(
        <div>
            <div>
                <span className={styles.label}>请输入位置名称：</span>
                <Input placeholder="位置名称" className={styles.input} onChange={namechange}/>
                <Button type="primary" className={styles.button} onClick={lookplace}>查询</Button>
            </div>
            <div className={styles.graph}>
                <div className={styles.chart}>
                    <LineChart width={screenWidth} height={screenHeight} data={co2.map((value, index) => ({ co2: value, people: people[index] }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="people" type="number" 
                            label={{ value: '人数', position: 'insideBottom', offset: -12 }} />
                        <YAxis dataKey="co2" type="number" 
                            label={{ value: 'CO2浓度', angle: -90, position: 'insideLeft', offset: 10}} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="co2" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
                <div className={styles.chart}>
                    <LineChart width={screenWidth} height={screenHeight} data={co2.map((value, index) => ({ co2: value, time: time[index] }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" type="category" 
                            label={{ value: '时间', position: 'insideBottom', offset: -12 }} />
                        <YAxis dataKey="co2" type="number" 
                            label={{ value: 'CO2浓度', angle: -90, position: 'insideLeft', offset: 10}} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="co2" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </div>
            <div className={styles.graph}>
                <div className={styles.chart}>
                    <BarChart width={screenWidth} height={screenHeight} data={data1}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="co2">
                            <Label value="CO2浓度" position="insideBottom" offset={0}/>
                        </XAxis>
                        <YAxis>
                            <Label angle={-90} value="数量" position="insideLeft" offset={10}/>
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </div>
                <div className={styles.chart}>
                    <BarChart width={screenWidth} height={screenHeight} data={data2}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="people">
                            <Label value="人数" position="insideBottomRight" offset={5}/>
                        </XAxis>
                        <YAxis>
                            <Label angle={-90} value="数量" position="insideLeft" offset={10}/>
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
                
        </div>
    )
}

export default View