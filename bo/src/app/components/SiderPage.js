/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const menuUrls = [
    {
        key: "1",
        url: "/home/tmpProducts"
    }, {
        key: "2",
        url: "/home/formalProducts"
    }, {
        key: "3",
        url: "/home/formalRemit"
    }, {
        key: "4",
        url: "/home/tortProducts"
    }, {
        key: "5",
        url: "/home/tortRemit"
    }, {
        key: "6",
        url: "/home/tortWords"
    }, {
        key: "7",
        url: "/home/categories"
    }, {
        key: "8",
        url: "/home/sizes"
    }, {
        key: "9",
        url: "/home/colours"
    }, {
        key: "10",
        url: "/home/filters"
    }, {
        key: "11",
        url: "/home/updateFilter"
    }, {
        key: "12",
        url: "/home/users"
    }, {
        key: "13",
        url: "/home/addUser"
    }, {
        key: "14",
        url: "/home/updateUser"
    }, {
        key: "15",
        url: "/home/companies"
    },
];

const subMenus = [
    {
        key: "sub1",
        value: ["2", "3"]
    },{
        key: "sub2",
        value: ["4", "5"]
    },{
        key: "sub3",
        value: ["10", "11"]
    },{
        key: "sub4",
        value: ["12", "13", "14", "15"]
    }
];

class SiderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getSelectedMenu() {
        let currentLocation = location.href;
        let selected = menuUrls.filter((item) => {
            return currentLocation.indexOf(item.url) > -1;
        });
        return selected[0].key;
    }

    getOpenedSub(selectedKey) {
        let opened = subMenus.filter((item) => {
            return item.value.indexOf(selectedKey) > -1;
        });
        return opened[0] && opened[0].key;
    }

    render() {
        let updateUserPath = "/home/updateUser/" + this.props.loginUserId;
        let selectedKey = this.getSelectedMenu();
        let openedSub = this.getOpenedSub(selectedKey);
        return (
                <Sider>
                    <Menu mode="inline" defaultSelectedKeys={[selectedKey]} defaultOpenKeys={[openedSub]}>
                        <MenuItem key="1">
                            <Icon type="switcher" />
                            <span className="nav-text"><Link to="/home/tmpProducts">数据采集及临时库管理</Link></span>
                        </MenuItem>
                        <SubMenu key="sub1" title={<span><Icon type="database" /><span className="nav-text"><Link to="/home/formalProducts">正式库管理</Link></span></span>}>
                            <MenuItem key="2">
                                <Icon type="bars" />
                                <span className="nav-text"><Link to="/home/formalProducts">正式库列表</Link></span>
                            </MenuItem>
                            <MenuItem key="3">
                                <Icon type="export" />
                                <span className="nav-text"><Link to="/home/formalRemit">正式库汇出</Link></span>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="exception" /><span className="nav-text"><Link to="/home/tortProducts">备用侵权库</Link></span></span>}>
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
                        <SubMenu key="sub3" title={<span><Icon type="filter" /><span className="nav-text"><Link to="/home/filters">过滤尺寸和颜色管理</Link></span></span>}>
                            <MenuItem key="10">
                                <Icon type="filter" />
                                <span className="nav-text"><Link to="/home/filters">过滤尺寸和颜色列表</Link></span>
                            </MenuItem>
                            <MenuItem key="11">
                                <Icon type="bars" />
                                <span className="nav-text">过滤尺寸和颜色详情</span>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="share-alt" /><span className="nav-text"><Link to="/home/users">账号与权限管理</Link></span></span>}>
                            <MenuItem key="12">
                                <Icon type="user" />
                                <span className="nav-text"><Link to="/home/users">账号管理</Link></span>
                            </MenuItem>
                            <MenuItem key="13">
                                <Icon type="user-add" />
                                <span className="nav-text"><Link to="/home/addUser">新建账号</Link></span>
                            </MenuItem>
                            <MenuItem key="14">
                                <Icon type="setting" />
                                <span className="nav-text"><Link to={updateUserPath}>修改账号</Link></span>
                            </MenuItem>
                            <MenuItem key="15">
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