/**
 * Created by Jilion on 2017/3/9.
 */
import alt from '../common/alt';
import UsersActions from '../actions/UsersActions';
import { message } from 'antd';

class UsersStore {
    constructor() {
        this.bindActions(UsersActions);
        this.state = {
            users: [],
            isLoad: false,
            searchName: '',
            searchPhone: '',
            companies: [],
            userInfo: {
                loginName: '',
                userName: '',
                phone: '',
                company: '',
                role: '',
                isAdmin: false
            }
        }
    }

    onGetAllUsersSuccess(data) {
        this.setState({
            users: data,
            isLoad: true
        });
    }

    onUpdateUserSuccess(data) {
        message.info('修改成功: ' + data.userName);
    }

    onUpdateUserFail(data) {
        message.error('修改失败: ' + data + ' 请联系管理员');
    }

    onUpdateSearchName(event) {
        this.setState({ searchName: event.target.value});
    }

    onUpdateSearchPhone(event) {
        this.setState({ searchPhone: event.target.value});
    }

    onAddUserSuccess(data) {
        message.info('添加成功: ' + data.userName);
    }

    onAddUserFail(data) {
        message.error('添加失败: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(UsersStore);