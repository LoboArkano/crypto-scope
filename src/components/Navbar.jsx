import React from 'react';
import {
  /* Button, */Menu, Typography, Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined, FundOutlined, MoneyCollectOutlined, BulbOutlined, /* MenuOutlined */
} from '@ant-design/icons';
import icon from '../stylesheets/images/icon.svg';

// eslint-disable-next-line arrow-body-style
const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypto Scope</Link>
        </Typography.Title>
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />} key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key="cryptocurrencies">
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key="exchanges">
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key="news">
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
        {/* <Button className="menu-control-container">

        </Button> */}
      </div>
    </div>
  );
};

export default Navbar;
