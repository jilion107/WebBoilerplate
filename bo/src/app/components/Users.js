/**
 * Created by Jilion on 2017/3/9.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions';

const FormItem = Form.Item;

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = UsersStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        UsersStore.listen(this.onChange);
        UsersActions.getAllUsers();
    }

    componentWillUnmount() {
        UsersStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleUpdate(data) {
        let user = {
            id: data.id.value,
            userName: data.userName.value,
            loginName: data.loginName.value,
            phone: data.phone.value,
            role: data.role.value
        }
        UsersActions.updateUser(user);
    }

    createDataSource(store) {
        return store.map((item, index) => {
            return {
                key: index,
                id: {
                    editable: false,
                    value: item.id,
                    changeable: false
                },
                loginName: {
                    editable: false,
                    value: item.loginName,
                    changeable: true
                },
                userName: {
                    editable: false,
                    value: item.userName,
                    changeable: true
                },
                phone: {
                    editable: false,
                    value: item.phone,
                    changeable: true
                },
                role: {
                    editable: false,
                    value: item.role,
                    changeable: true
                },
                createTime: {
                    editable: false,
                    value: item.createTime,
                    changeable: true
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let users = this.state.users;
        let dataSource = this.createDataSource(users);
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '10%'
            }, {
                title: '登录名',
                dataIndex: 'loginName',
                width: '15%'
            }, {
                title: '姓名',
                dataIndex: 'userName',
                width: '15%'
            }, {
                title: '电话',
                dataIndex: 'phone',
                width: '15%'
            }, {
                title: '权限',
                dataIndex: 'role',
                width: '15%'
            }, {
                title: '注册时间',
                dataIndex: 'createTime',
                width: '15%'
            }, {
                title: '操作',
                dataIndex: 'operation'
            }
        ];

        return( this.state.isLoad ?
                <div>
                    <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label="姓名">
                            {getFieldDecorator('searchName', {
                                rules: []
                            })(
                                <Input size="large"  onChange={UsersActions.onUpdateSearchName}/>
                            )}
                        </FormItem>
                        <FormItem label="姓名">
                            {getFieldDecorator('searchPhone', {
                                rules: []
                            })(
                                <Input size="large"  onChange={UsersActions.onUpdateSearchPhone}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } callback={this.handleUpdate.bind(this)} fields={ 6 }/>
                </div> : null
        );
    }
}

let Users = Form.create()(UsersPage);
export default Users;