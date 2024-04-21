import React, { useState } from 'react';
import {Layout} from 'antd';
import {Outlet} from "react-router-dom";
import MainMemu from "@/components/MainMemu"
import {Button,message} from 'antd';
import {useNavigate} from "react-router-dom";
import "@/assets/styles/global.scss"

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate()

  const logout = () =>{
    message.success("退出登录成功！")
    navigate("/login");
  }

  return (
    <Layout style={{ minHeight:'100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='demo-logo-vertical'>菜单栏</div>
        <MainMemu></MainMemu>
      </Sider>
      <Layout>
        <Header className="site-layout-header">
          <div className="site-layout-header-title">碳索智能二氧化碳在线监测平台</div>
          <Button type="primary" onClick={logout} className="site-layout-header-button">退出登录</Button>
        </Header>
        <Content className="site-layout-content">
          <Outlet />
        </Content>
        <Footer className="site-layout-footer"></Footer>
      </Layout>
    </Layout>
  );
};

export default View;