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
        url: "/zhijian/tmpProducts"
    }, {
        key: "2",
        url: "/zhijian/formalProducts"
    }, {
        key: "3",
        url: "/zhijian/formalRemit"
    }, {
        key: "4",
        url: "/zhijian/tortProducts"
    }, {
        key: "5",
        url: "/zhijian/tortRemit"
    }, {
        key: "6",
        url: "/zhijian/tortWords"
    }, {
        key: "7",
        url: "/zhijian/categories"
    }, {
        key: "8",
        url: "/zhijian/sizes"
    }, {
        key: "9",
        url: "/zhijian/colours"
    }, {
        key: "10",
        url: "/zhijian/filters"
    }, {
        key: "11",
        url: "/zhijian/users"
    }, {
        key: "12",
        url: "/zhijian/addUser"
    }, {
        key: "13",
        url: "/zhijian/updateUser"
    }, {
        key: "14",
        url: "/zhijian/companies"
    },{
        key: "15",
        url: "/zhijian/amazonCrawl"
    },{
        key: "16",
        url: "/zhijian/amazonApi"
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
        value: ["12", "13", "14"]
    },{
        key: "sub4",
        value: ["15", "16"]
    }
];
const isAdmin = localStorage.getItem("loginRole") === '1';

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
        let updateUserPath = "/zhijian/updateUser/" + this.props.loginUserId;
        let selectedKey = this.getSelectedMenu();
        let openedSub = this.getOpenedSub(selectedKey);
        return (
                <Sider>
                    <Menu mode="inline" defaultSelectedKeys={[selectedKey]} defaultOpenKeys={[openedSub]}>
                        <MenuItem key="1">
                            <Icon type="switcher" />
                            <span className="nav-text"><Link to="/zhijian/tmpProducts">数据采集及临时库管理</Link></span>
                        </MenuItem>
                        <MenuItem key="2">
                            <Icon type="bars" />
                            <span className="nav-text"><Link to="/zhijian/formalProducts">正式库管理</Link></span>
                        </MenuItem>

                        <MenuItem key="4">
                            <Icon type="bars" />
                            <span className="nav-text"><Link to="/zhijian/tortProducts">侵权库管理</Link></span>
                        </MenuItem>

                        <MenuItem key="6">
                            <Icon type="bars" />
                            <span className="nav-text"><Link to="/zhijian/tortWords">侵权词管理</Link></span>
                        </MenuItem>
                        <MenuItem key="7">
                            <Icon type="tag-o" />
                            <span className="nav-text"><Link to="/zhijian/categories">分类管理</Link></span>
                        </MenuItem>
                        <MenuItem key="8">
                            <Icon type="scan" />
                            <span className="nav-text"><Link to="/zhijian/sizes">尺寸管理</Link></span>
                        </MenuItem>
                        <MenuItem key="9">
                            <Icon type="chrome" />
                            <span className="nav-text"><Link to="/zhijian/colours">颜色管理</Link></span>
                        </MenuItem>
                        <MenuItem key="10">
                            <Icon type="filter" />
                            <span className="nav-text"><Link to="/zhijian/filters">过滤尺寸和颜色列表</Link></span>
                        </MenuItem>
                        <SubMenu key="sub3" title={<span><Icon type="share-alt" /><span className="nav-text">{isAdmin ? '账号与权限管理': '账号管理'}</span></span>}>
                            {isAdmin ?
                                <MenuItem key="11">
                                    <Icon type="user" />
                                    <span className="nav-text"><Link to="/zhijian/users">账号管理</Link></span>
                                </MenuItem>
                                :
                                null
                            }
                            {isAdmin ?
                                <MenuItem key="12">
                                    <Icon type="user-add" />
                                    <span className="nav-text"><Link to="/zhijian/addUser">新建账号</Link></span>
                                </MenuItem>
                                :
                                null
                            }
                            <MenuItem key="13">
                                <Icon type="setting" />
                                <span className="nav-text"><Link to={updateUserPath}>修改账号</Link></span>
                            </MenuItem>
                            {isAdmin ?
                                <MenuItem key="14">
                                    <Icon type="team" />
                                    <span className="nav-text"><Link to="/zhijian/companies">公司管理</Link></span>
                                </MenuItem>
                                :
                                null
                            }
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="share-alt" /><span className="nav-text">Amazon 爬虫</span></span>}>
                            <MenuItem key="15">
                                <Icon type="team" />
                                <span className="nav-text"><Link to="/zhijian/amazonCrawl">爬虫</Link></span>
                            </MenuItem>
                            <MenuItem key="16">
                                <Icon type="team" />
                                <span className="nav-text"><Link to="/zhijian/amazonApi">API</Link></span>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sider>
        );
    }
}

export default SiderPage;