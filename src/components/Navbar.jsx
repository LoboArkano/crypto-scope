import React, { useEffect, useState } from 'react';
import {
  Button, Menu, Typography, Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined, FundOutlined, MoneyCollectOutlined, BulbOutlined, MenuOutlined,
} from '@ant-design/icons';
import icon from '../stylesheets/images/icon.svg';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" className="brand" />
        <Typography.Title level={3} className="logo">
          <Link to="/">Crypto Scope</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          onClick={() => {
            if (screenSize < 800) setActiveMenu(!activeMenu);
          }}
        >
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
      )}
    </div>
  );
};

export default Navbar;
