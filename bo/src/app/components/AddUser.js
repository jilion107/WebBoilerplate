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
import { ROLEEBUM }from '../common/Config';

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
        UsersStore.listen(this.onChange);
        CompanyStore.listen(this.onChange);
        CompanyActions.getAllCompany();
    }

    componentWillUnmount() {
        UsersStore.unlisten(this.onChange);
        CompanyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        this.props.form.validateFields((err, values) => {
           if(err) {
               return;
           } else {
               this.setState({ values});
               UsersActions.addUser(values);
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
        return (
            <div className="zhijian-addUser">
                <Form layout="horizontal">
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="登录名：">
                        {getFieldDecorator('loginName', {
                            rules: [{ required: true, message: '请输入登录名！'}]
                        })(
                            <Input size="large" />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="姓  名：">
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入姓名！'}]
                        })(
                            <Input size="large" />
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
                                {companyOptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="权  限：">
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: '请选择权限！'}]
                        })(
                            <Select placeholder="选择权限">
                                {roleOptions}
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
                        <Button type="primary" htmlType="submit" onClick={this.handleAdd.bind(this)}>添加</Button>
                    </FormItem>
                </Form>
                <Modal title="添加成功"
                       visible={this.state.isAddSuccess}
                       onOk={this.addMore.bind(this)}
                       onCancel={this.goToUsers.bind(this)}
                       maskClosable
                       width="300"
                >
                    <p>继续添加用户?</p>
                </Modal>
            </div>
        );
    }
}

let AddUser = Form.create()(AddUserPage);
export default AddUser;