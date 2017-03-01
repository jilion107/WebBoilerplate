/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Icon, Menu } from 'antd';
import { Layout } from 'antd';
import './header.less';

const Header = Layout.Header;
const SubMenu = Menu.SubMenu;

class HeaderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <div className="siderbutton" onClick={null}>
                    <Icon type={false ? 'menu-unfold' : 'menu-fold'} />
                </div>
                <Menu mode="horizontal">
                    <SubMenu title={<span><Icon type="user" />{this.props.username}</span>}>
                        <Menu.Item key="logout">
                            <a href="">注销</a>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default HeaderPage;