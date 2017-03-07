/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Icon, Menu } from 'antd';

const SubMenu = Menu.SubMenu;

class HeaderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed : false
        }
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
        this.props.toggleSider && this.props.toggleSider(this.state.collapsed);
    }

    render() {
        return (
            <div className="ant-layout-header">
                <div className="siderbutton" onClick= {this.toggle.bind(this)}>
                    <Icon type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'} />
                </div>
                <Menu mode="horizontal" className="header-menu">
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