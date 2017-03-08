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
                <Sider>
                    <Menu mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="switcher" />
                            <span className="nav-text">数据采集及临时库管理</span>
                        </Menu.Item>
                        <SubMenu key="sub2" title={<span><Icon type="switcher" /><span className="nav-text">正式库管理</span></span>}>
                            <Menu.Item key="2">
                                <Icon type="bars" />
                                <span className="nav-text">正式库列表</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="export" />
                                <span className="nav-text">正式库汇出</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="exception" /><span className="nav-text">备用侵权库</span></span>}>
                            <Menu.Item key="4">
                                <Icon type="bars" />
                                <span className="nav-text">侵权库列表</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="export" />
                                <span className="nav-text">侵权库汇出</span>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="6">
                            <Icon type="bars" />
                            <span className="nav-text">侵权词管理</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="tag-o" />
                            <span className="nav-text">分类管理</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="scan" />
                            <span className="nav-text">尺寸管理</span>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Icon type="chrome" />
                            <span className="nav-text">颜色管理</span>
                        </Menu.Item>
                        <SubMenu key="sub5" title={<span><Icon type="filter" /><span className="nav-text">过滤尺寸和颜色管理</span></span>}>
                            <Menu.Item key="10">
                                <Icon type="filter" />
                                <span className="nav-text">过滤尺寸和颜色列表</span>
                            </Menu.Item>
                            <Menu.Item key="11">
                                <Icon type="bars" />
                                <span className="nav-text">过滤尺寸和颜色详情</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" title={<span><Icon type="share-alt" /><span className="nav-text">账号与权限管理</span></span>}>
                            <Menu.Item key="10">
                                <Icon type="user" />
                                <span className="nav-text">账号管理</span>
                            </Menu.Item>
                            <Menu.Item key="11">
                                <Icon type="plus-circle" />
                                <span className="nav-text">新建账号</span>
                            </Menu.Item>
                            <Menu.Item key="12">
                                <Icon type="setting" />
                                <span className="nav-text">修改账号</span>
                            </Menu.Item>
                            <Menu.Item key="13">
                                <Icon type="team" />
                                <span className="nav-text">公司管理</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
        );
    }
}

export default SiderPage;