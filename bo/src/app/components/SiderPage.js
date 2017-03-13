/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class SiderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Sider>
                    <Menu mode="inline" defaultSelectedKeys={['1']}>
                        <MenuItem key="1">
                            <Icon type="switcher" />
                            <span className="nav-text"><Link to="/home/tmpProducts">数据采集及临时库管理</Link></span>
                        </MenuItem>
                        <SubMenu key="sub2" title={<span><Icon type="database" /><span className="nav-text"><Link to="/home/formalProducts">正式库管理</Link></span></span>}>
                            <MenuItem key="2">
                                <Icon type="bars" />
                                <span className="nav-text"><Link to="/home/formalProducts">正式库列表</Link></span>
                            </MenuItem>
                            <MenuItem key="3">
                                <Icon type="export" />
                                <span className="nav-text"><Link to="/home/formalRemit">正式库汇出</Link></span>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="exception" /><span className="nav-text"><Link to="/home/tortProducts">备用侵权库</Link></span></span>}>
                            <MenuItem key="4">
                                <Icon type="bars" />
                                <span className="nav-text"><Link to="/home/tortProducts">侵权库列表</Link></span>
                            </MenuItem>
                            <MenuItem key="5">
                                <Icon type="export" />
                                <span className="nav-text"><Link to="/home/tortRemit">侵权库汇出</Link></span>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem key="6">
                            <Icon type="bars" />
                            <span className="nav-text"><Link to="/home/tortWords">侵权词管理</Link></span>
                        </MenuItem>
                        <MenuItem key="7">
                            <Icon type="tag-o" />
                            <span className="nav-text"><Link to="/home/categories">分类管理</Link></span>
                        </MenuItem>
                        <MenuItem key="8">
                            <Icon type="scan" />
                            <span className="nav-text"><Link to="/home/sizes">尺寸管理</Link></span>
                        </MenuItem>
                        <MenuItem key="9">
                            <Icon type="chrome" />
                            <span className="nav-text"><Link to="/home/colours">颜色管理</Link></span>
                        </MenuItem>
                        <SubMenu key="sub5" title={<span><Icon type="filter" /><span className="nav-text"><Link to="/home/filter">过滤尺寸和颜色管理</Link></span></span>}>
                            <MenuItem key="10">
                                <Icon type="filter" />
                                <span className="nav-text"><Link to="/home/filter">过滤尺寸和颜色列表</Link></span>
                            </MenuItem>
                            <MenuItem key="11">
                                <Icon type="bars" />
                                <span className="nav-text">过滤尺寸和颜色详情</span>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu key="sub6" title={<span><Icon type="share-alt" /><span className="nav-text"><Link to="/home/users">账号与权限管理</Link></span></span>}>
                            <MenuItem key="10">
                                <Icon type="user" />
                                <span className="nav-text"><Link to="/home/users">账号管理</Link></span>
                            </MenuItem>
                            <MenuItem key="11">
                                <Icon type="user-add" />
                                <span className="nav-text"><Link to="/home/addUser">新建账号</Link></span>
                            </MenuItem>
                            <MenuItem key="12">
                                <Icon type="setting" />
                                <span className="nav-text"><Link to="/home/addUser">修改账号</Link></span>
                            </MenuItem>
                            <MenuItem key="13">
                                <Icon type="team" />
                                <span className="nav-text"><Link to="/home/companies">公司管理</Link></span>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sider>
        );
    }
}

export default SiderPage;