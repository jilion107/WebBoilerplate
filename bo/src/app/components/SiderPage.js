/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const Sider = Layout.Sider;

class SiderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="sider">
                <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
                    </Menu>
                </Sider>
            </aside>
        );
    }
}

export default SiderPage;