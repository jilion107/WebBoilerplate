/**
 * Created by jilion.chen on 2/28/2017.
 */
import alt from '../common/alt';
import LoginTransport from '../transport/LoginTransport';

class LoginActions {
    constructor() {
        this.generateActions(
            'login',
            'loginSuccess',
            'loginFail',
            'onUpdateUserName',
            'onUpdatePassword'
        );
    }

    signIn(name, password) {
        let signInstance = new LoginTransport();
        signInstance.login(name, password).then((response) => {
            this.loginSuccess(response);
        },(response) => {
            this.loginFail(response);
        });
    }
}

export default alt.createActions(LoginActions);