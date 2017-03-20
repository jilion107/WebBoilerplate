/**
 * Created by jilion.chen on 3/8/2017.
 */
import React from 'react';
import { Layout } from 'antd';
import HeaderPage from './HeaderPage';
import SiderPage from './SiderPage';
import util from '../common/Util';
import './main.less';

const { Content } = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUserId: localStorage.getItem("loginUserId"),
            loginName: localStorage.getItem("loginName")
        }
    }

    render() {
        return (
            <div className="zhijian-main">
                <HeaderPage loginName={this.state.loginName} loginUserId={this.state.loginUserId}/>
                <Content>
                    <Layout>
                        <SiderPage loginUserId={this.state.loginUserId}/>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Content>
            </div>
        );
    }
}

export default App;
