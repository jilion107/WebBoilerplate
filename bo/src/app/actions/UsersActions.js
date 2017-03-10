/**
 * Created by Jilion on 2017/3/9.
 */
import alt from '../common/alt';
import UsersTransport from '../transport/UsersTransport';
import _ from 'underscore';

class UsersActions {
    constructor() {
        this.generateActions(
            'getAllUsersSuccess',
            'getAllUsersFail',
            'updateUserSuccess',
            'updateUserFail',
            'onUpdateSearchName',
            'onUpdateSearchPhone'
        );
        this.userInstance = new UsersTransport();
    }

    getAllUsers() {
        this.userInstance.getAllUsers().then((response) => {
            _.assign(response, history)
            this.getAllUsersSuccess(response);
        }, (response) => {
            this.getAllUsersFail(response);
        });
    }

    updateUser(user) {
        this.userInstance.updateUser(user).then((response) => {
            this.updateUserSuccess(response);
        }, (response) => {
            this.updateUserFail(response);
        });
    }
}

export default alt.createActions(UsersActions);