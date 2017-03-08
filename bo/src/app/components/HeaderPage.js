/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Layout, Menu } from 'antd';
import './header.less';

const { Header } = Layout;

class HeaderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="zhijian-header">
                <Header>
                    <div className="zhijian-header-user">您好，{this.props.username}</div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1" >我的账户</Menu.Item>
                        <Menu.Item key="2">退出</Menu.Item>
                    </Menu>
                    <div className="zhijian-header-banner" />
                </Header>
            </div>
        );
    }
}

export default HeaderPage;