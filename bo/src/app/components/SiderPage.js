/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;

class SiderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="sub1" title={<span><Icon type="user" /><span className="nav-text">数据采集</span></span>}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="team" /><span className="nav-text">正式库管理</span></span>}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
        );
    }
}

export default SiderPage;