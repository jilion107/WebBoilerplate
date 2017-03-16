/**
 * Created by jilion.chen on 2/27/2017.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import createHistory from 'history/lib/createHashHistory';
import './login.less';

const FormItem = Form.Item;
const history = createHistory();
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        LoginStore.listen(this.onChange);
    }

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        LoginActions.login(this.state.username, this.state.password, history);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div className="login">
            <div className="login-banner">
                <span>您好, <font color="red">请登录</font></span>
            </div>
            <div className="login-form">
                <div className="login-title">
                    <h1>安全登录</h1>
                </div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入账号！'}]
                        })(
                            <Input size="large" addonBefore={<Icon type="user" />} placeholder="登录账号" onChange={LoginActions.onUpdateUserName}/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！'}]
                        })(
                            <Input size="large" addonBefore={<Icon type="lock" />} type="password" placeholder="登录密码" onChange={LoginActions.onUpdatePassword}/>
                        )}
                    </FormItem>
                    <Button size="large" type="primary" htmlType="submit" id="loginBtn">登录</Button>
                </Form>
            </div>
        </div>
        );
    }
}

let Login = Form.create()(LoginPage);
export default Login;
