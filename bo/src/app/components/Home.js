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

    render() {
        return (
            <div className="layout">
                <SiderPage siderFold={this.state.collapsed}/>
                <Layout className="main">
                    <HeaderPage username="jilion"/>
                    {this.props.children}
                    <Footer>Footer</Footer>
                </Layout>
            </div>
        );
    }
}

export default Home;