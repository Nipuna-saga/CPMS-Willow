import React from "react";
import { Outlet } from "react-router-dom";

import { Button, Flex, Layout } from "antd";
import {  LogoutOutlined } from "@ant-design/icons";


const { Header, Footer, Content } = Layout;

function HeaderComponent() {
  return (
    <Flex gap="middle" wrap>
      <Layout className="main-layout">
        <Header className="header-style">
          <h2>Construction Project Management System</h2>
          <div>
            <Button onClick={() => {}} icon={<LogoutOutlined />}>
              Logout
            </Button>
          </div>
        </Header>

        <Content className="content-style">
          <Outlet />
        </Content>

        <Footer className="footer-style">
          All Rights Reserved 2024 @CPMS Willow
        </Footer>
      </Layout>
    </Flex>
  );
}

export default HeaderComponent;
