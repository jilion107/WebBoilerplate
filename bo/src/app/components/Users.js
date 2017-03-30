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
        this.state.dataSource = [];
        this.state.isLoad = true;
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
        let rawUser = data[index];
		if (rawUser) {
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
    }

    handleSearch(data) {
        UsersActions.searchUsers(data);
    }

    handleDelete(index){
        let userId = this.state.dataSource[index]["id"].value;
        UsersActions.deleteUser(index, userId);
    }

    render() {
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
		
		const searchGroupProps = {
			keyword: '',
			size: 'large',
			select: true,
			selectOptions: [{ value: 'userName', name: '姓名' }, { value: 'phone', name: '电话' }],
			selectProps: {
				defaultValue: 'userName',
			},
			onSearch: this.handleSearch.bind(this)
		}		

        return( this.state.isLoad ?
                <div>
                    <Search {...searchGroupProps} />
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.handleUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 6 }/>
                </div> : null
        );
    }
}

let Users = UsersPage;
export default Users;