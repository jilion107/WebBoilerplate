/**
 * Created by Jilion on 2017/3/9.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions';
import Search from '../common/Search';

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

    handleUpdate(data, index) {
     /*   let user = this.state.users.find((item) => {
            return item.id === data.id.value;
        });
        user.userName = data.userName.value;
        user.loginName = data.loginName.value;
        user.phone = data.phone.value;
        user.role = data.role.value;
        UsersActions.updateUser(user);*/
        let rawUser = data[index];
        let newUser = {};
        let isCancel = false;
        Object.keys(rawUser).forEach((prop) => {
            if(prop !== "key") {
                newUser[prop] = rawUser[prop].value
                if(rawUser[prop].status === "cancel") {
                    isCancel = true;
                }
            }
        });
        UsersActions.updateUser(newUser, data, isCancel);
    }

    handleSearch() {
        const search = new Search();
        let data = search.onSearch(this.state.users, this.state.searchName, 'userName');
        this.setState({
            users: data
        });
    }

    handleDelete(index){
        let userId = this.state.dataSource[index]["id"].value;
        UsersActions.deleteUser(index, userId);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let dataSource = this.state.dataSource;
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
                    <Form layout="inline" onSubmit={this.handleUpdate.bind(this)}>
                        <FormItem label="姓名">
                            {getFieldDecorator('searchName', {
                                rules: []
                            })(
                                <Input size="large"  onChange={UsersActions.onUpdateSearchName}/>
                            )}
                        </FormItem>
                        <FormItem label="电话">
                            {getFieldDecorator('searchPhone', {
                                rules: []
                            })(
                                <Input size="large"  onChange={UsersActions.onUpdateSearchPhone}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)}>搜索</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.handleUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 6 }/>
                </div> : null
        );
    }
}

let Users = Form.create()(UsersPage);
export default Users;