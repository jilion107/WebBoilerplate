/**
 * Created by jilion.chen on 3/10/2017.
 */
import React from 'react';
import { Form, Select, Input, Button, Checkbox, Modal} from 'antd';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions';
import Util from '../common/Util';
import { ROLEEBUM }from '../common/Config';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = UsersStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let userId = this.props.params.id;
        UsersStore.listen(this.onChange);
        userId && UsersActions.getUserById(userId);
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    componentWillUnmount() {
        UsersStore.unlisten(this.onChange);
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
        const companyOptions = this.state.companies.map(company => <Option key={company.id} value={company.id}>{company.companyName}</Option>);
        const roleOptions = ROLEEBUM && ROLEEBUM.map(role => <Option key={role.key} value={role.key}>{role.value}</Option>);
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
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="权  限：">
                        {getFieldDecorator('role', {
                        rules: [{ required: true, message: '请选择权限！'}],
                            initialValue: userInfo ? userInfo.role : ''
                        })(
                        <Select placeholder="选择权限">
                            {roleOptions}
                            </Select>
                    )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="公  司：">
                        {getFieldDecorator('companyId', {
                            rules: [{ }],
                            initialValue: userInfo ? userInfo.companyId : ''
                        })(
                            <Select placeholder="选择公司" >
                                {companyOptions}
                            </Select>
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