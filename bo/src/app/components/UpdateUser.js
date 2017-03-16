/**
 * Created by jilion.chen on 3/10/2017.
 */
import React from 'react';
import { Form, Select, Input, Button, Checkbox, Modal} from 'antd';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions';
import CompanyActions from '../actions/CompanyActions';
import CompanyStore from '../stores/CompanyStore';
import Util from '../common/Util';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = UsersStore.getState();
        this.state = CompanyStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let userId = this.props.params.id;
        UsersStore.listen(this.onChange);
        CompanyStore.listen(this.onChange);
        userId && UsersActions.getUserById(userId);
        CompanyActions.getAllCompany();
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    componentWillUnmount() {
        UsersStore.unlisten(this.onChange);
        CompanyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleUpdate() {
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            } else {
                this.setState({ values});
                values.id = this.props.params.id;
                UsersActions.updateUser(values);
            }
        });
    }

    addMore() {
        Util.changLocation("/home/addUser")
    }

    goToUsers() {
        Util.changLocation("/home/users")
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const companyOptions = this.state.dataSource.map(company => <Option key={company.id.value} value={company.id.value}>{company.companyName.value}</Option>);
        let { userInfo } = this.state;
        return (
            <div className="zhijian-addUser">
                <Form layout="horizontal">
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="登录名：">
                        {getFieldDecorator('loginName', {
                            rules: [{ required: true, message: '请输入登录名！'}],
                            initialValue: userInfo ? userInfo.loginName : ''
                        })(
                            <Input size="large" />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="姓  名：">
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入姓名！'}],
                            initialValue: userInfo ? userInfo.userName : ''
                        })(
                            <Input size="large" />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="电  话：">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入电话！'}],
                            initialValue: userInfo ? userInfo.phone : ''
                        })(
                            <Input size="large" />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="公  司：">
                        {getFieldDecorator('companyId', {
                            rules: [{ required: true, message: '请选择公司！'}],
                            initialValue: userInfo ? userInfo.companyId : ''
                        })(
                            <Select placeholder="选择公司" >
                                {companyOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="权  限：">
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: '请选择权限！'}],
                            initialValue: userInfo ? userInfo.role : ''
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
                        <Button type="primary" htmlType="submit" onClick={this.handleUpdate.bind(this)}>修改</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

let AddUser = Form.create()(AddUserPage);
export default AddUser;