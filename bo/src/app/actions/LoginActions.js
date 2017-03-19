/**
 * Created by jilion.chen on 2/28/2017.
 */
import alt from '../common/alt';
import LoginTransport from '../transport/LoginTransport';
import _ from 'underscore';

class LoginActions {
    constructor() {
        this.generateActions(
            'loginSuccess',
            'loginFail',
            'onUpdateUserName',
            'onUpdatePassword'
        );
    }

    login(name, password, history) {
        let loginInstance = new LoginTransport();
        loginInstance.login(name, password).then((response) => {
            if(response.result === "fail") {
                this.loginFail(response.message);
            } else {
                _.assign(response, history)
                this.loginSuccess(response);
            }
        },(response) => {
            this.loginFail(response);
        });
    }
}

export default alt.createActions(LoginActions);