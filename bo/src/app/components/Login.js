/**
 * Created by jilion.chen on 2/27/2017.
 */
import React from 'react';
import { Form, Icon, Input, Button, notification} from 'antd';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import './login.less';

const FormItem = Form.Item;
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
        LoginActions.signIn(this.state.username, this.state.password);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div className="form">
            <div className="logo"/>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账号！'}]
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="账号" onChange={LoginActions.onUpdateUserName}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！'}]
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" onChange={LoginActions.onUpdatePassword}/>
                    )}
                </FormItem>
                <Button type="primary" htmlType="submit" id="loginBtn">登录</Button>
            </Form>
        </div>
        );
    }
}

let Login = Form.create()(LoginPage);
export default Login;
