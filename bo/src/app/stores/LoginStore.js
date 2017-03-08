/**
 * Created by jilion.chen on 2/28/2017.
 */
import alt from '../common/alt';
import LoginActions from '../actions/LoginActions';
import { message } from 'antd';
import util from '../common/Util'

class LoginStore {
    constructor() {
        this.bindActions(LoginActions);
        this.state = {
            username: '',
            password: ''
        }
    }

    onLoginSuccess(data) {
        message.info('登录成功, 账号: ' + data.userName);
        util.changLocation('/home');
    }

    onLoginFail(data) {
        message.error('登录失败: ' + data + ' 请联系管理员');
    }

    onUpdateUserName(event) {
        this.setState({ username: event.target.value });
    }

    onUpdatePassword(event) {
        this.setState({ password: event.target.value });
    }
}

export default alt.createStore(LoginStore);