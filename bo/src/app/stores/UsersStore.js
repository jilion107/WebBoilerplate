/**
 * Created by Jilion on 2017/3/9.
 */
import alt from '../common/alt';
import UsersActions from '../actions/UsersActions';
import { message, } from 'antd';
import { ROLEEBUM }from '../common/Config';

class UsersStore {
    constructor() {
        this.bindActions(UsersActions);
        this.state = {
            dataSource: [],
            isLoad: false,
            searchName: '',
            searchPhone: '',
            userInfo: {
                loginName: '',
                userName: '',
                phone: '',
                company: '',
                role: '',
                isAdmin: false
            },
            isAddSuccess: false,
            companies: []
        }
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
                    changeable: false
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
                    changeable: true,
                    groups: ROLEEBUM
                },
                createTime: {
                    editable: false,
                    value: item.createTime,
                    changeable: false
                }
            }
        });
    }

    onGetAllUsersSuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }

    onUpdateUserSuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateUserFail(data) {
        message.error('修改失败: ' + data);
    }

    onUpdateSearchName(event) {
        this.setState({ searchName: event.target.value});
    }

    onUpdateSearchPhone(event) {
        this.setState({ searchPhone: event.target.value});
    }

    onAddUserSuccess(data) {
        message.info('添加成功: ' + data.user.loginName);
        this.setState({ isAddSuccess: true });
    }

    onAddUserFail(data) {
        message.error('添加失败: ' + data);
    }

    onGetUserSuccess(data) {
        this.setState({
            userInfo: data[0].user,
            companies: data[1]
        });
    }

    onGetUserFail(data) {
        message.error('获取失败: ' + data);
    }

    onDeleteUserSuccess(data) {
        message.info('删除成功. ');
        const dataSource = [...this.state.dataSource];
        dataSource.splice(data.index, 1);
        this.setState({ dataSource });

    }

    onDeleteUserFail(data) {
        message.error('删除失败: ' + data);
    }
	
    onSearchUsersSuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }	
	
    onSearchUsersFail(data) {
        message.error('获取失败: ' + data);
    }	
}

export default alt.createStore(UsersStore);