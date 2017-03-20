/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Layout, Menu } from 'antd';
import './header.less';
import Util from '../common/Util';

const { Header } = Layout;

class HeaderPage extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut() {
        localStorage.clear();
        Util.changLocation('/login');
    }

    myAccount() {
        Util.changLocation('/home/updateUser/' + this.props.loginUserId);
    }

    render() {
        return (
            <div className="zhijian-header">
                <Header>
                    <div className="zhijian-header-user">您好，{this.props.loginName}</div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1" ><a onClick={this.myAccount.bind(this)}>我的账户</a></Menu.Item>
                        <Menu.Item key="2" ><a onClick={this.logOut.bind(this)}>退出</a></Menu.Item>
                    </Menu>
                    <div className="zhijian-header-banner" />
                </Header>
            </div>
        );
    }
}

export default HeaderPage;