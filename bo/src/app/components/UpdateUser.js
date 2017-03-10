/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Select, Input, Button, Checkbox} from 'antd';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions';

const FormItem = Form.Item;

class UpdateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = UsersStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        UsersStore.listen(this.onChange);
    }

    componentWillUnmount() {
        UsersStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleUpdate() {
        let userInfo = this.props.form.getFieldsValue();
        this.setState({ userInfo: userInfo});
        UsersActions.updateUser(userInfo);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="zhijian-addUser">
                <Form layout="horizontal" onSubmit={this.handleUpdate.bind(this)}>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="登录名：">
                        {getFieldDecorator('loginName', {
                            rules: [{ required: true, message: '请输入登录名！'}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="姓  名：">
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入姓名！'}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="电  话：">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入电话！'}]
                        })(
                            <Input size="large" />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="公  司：">
                        {getFieldDecorator('companyId', {
                            rules: [{ required: true, message: '请选择公司！'}]
                        })(
                            <Select placeholder="选择公司">
                                <Option value="1">指间科技</Option>
                                <Option value="2">翼华科技</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="权  限：">
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: '请选择权限！'}]
                        })(
                            <Select placeholder="选择权限">
                                <Option value="1">超级管理员</Option>
                                <Option value="2">管理员</Option>
                                <Option value="3">普通用户</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 15, offset: 6 }} className="checkbox">
                        {getFieldDecorator('isAdmin', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>公司管理员</Checkbox>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 3, offset: 17 }}>
                        <Button type="primary" htmlType="submit">修改</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

let UpdateUser = Form.create()(UpdateUserPage);
export default UpdateUser;