import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

function Header({ location }) {

  return (
    <Menu mode="horizontal" theme="dark" selectedKeys={[location.pathname]}>
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="user" /> Users</Link>
      </Menu.Item>
    </Menu>
  )

}

export default Header
