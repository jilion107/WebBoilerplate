/**
 * Created by jilion.chen on 3/1/2017.
 */
import React from 'react';
import { Layout } from 'antd';
import './main.less';
import HeaderPage from './HeaderPage';
import SiderPage from './SiderPage';

const { Header, Footer, Sider } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    toggleSider(value) {
        this.setState({
            collapsed : value
        });
    }

    render() {
        return (
            <div className="ant-layout-aside">
                <SiderPage collapsed={this.state.collapsed}/>
                <div className={this.state.collapsed ? "ant-layout-main-collapse" : "ant-layout-main"}>
                    <HeaderPage username="jilion" toggleSider={this.toggleSider.bind(this)}/>
                        <div className="ant-layout-container">
                            <div className="ant-layout-content">
                                {this.props.children}
                            </div>
                        </div>
                    <Footer>Footer</Footer>
                </div>
            </div>
        );
    }
}

export default Home;