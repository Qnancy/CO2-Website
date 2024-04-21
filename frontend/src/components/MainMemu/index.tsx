import {
    HomeOutlined,
    DesktopOutlined,
    EnvironmentOutlined,
    SearchOutlined,
    PieChartOutlined,
    PictureOutlined
  } from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useNavigate, useLocation} from "react-router-dom";
import React,{useState} from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '首页',
    key: '/HomePage',
    icon: <HomeOutlined />,
  },
  {
    label: '数据统计',
    key: '/Data',
    icon: <PieChartOutlined />,
  },
  {
    label: '位置配置',
    key: '/Layout',
    icon: <DesktopOutlined />,
  },
  {
    label: '查看位置',
    key: '/Look',
    icon: <SearchOutlined />,
  },
  {
    label: '地图展示',
    key: '/Map',
    icon: <EnvironmentOutlined />,
  },
  {
    label: '人数识别',
    key: '/Picture',
    icon: <PictureOutlined />,
  },
]

const Comp: React.FC = () => {
    const navigateTo = useNavigate()
    const currentRoute = useLocation()
    console.log(currentRoute.pathname);
    const menuClick = (e:{key:string}) =>{
      navigateTo(e.key);
    }

    let firstOpenKey:string = "";
    function findkey(value:{key:string}){
      return value.key == currentRoute.pathname
    }
    for(let i=0;i<items.length;i++){
      if(items[i]!['children'] && items[i]!['children'].length>0 && items[i]!['children'].find(findkey)){
        firstOpenKey = items[i]!.key as string;
        break;
      }
    }

    const [openKeys, setOpenKeys] = useState([firstOpenKey]);
    const handleOpenChange = (keys:string[]) => {
      setOpenKeys([keys[keys.length-1]]);
    }

    return (
        <Menu 
          theme="dark" 
          defaultSelectedKeys={[currentRoute.pathname]} 
          mode="inline" 
          items={items} 
          onClick={menuClick}
          onOpenChange={handleOpenChange}
          openKeys={openKeys}
        />
    )
}

export default Comp;