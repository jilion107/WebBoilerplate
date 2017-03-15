/**
 * Created by Jilion on 2017/3/9.
 */
import alt from '../common/alt';
import UsersTransport from '../transport/UsersTransport';
import CompanyTransport from '../transport/CompanyTransport';
import _ from 'underscore';

class UsersActions {
    constructor() {
        this.generateActions(
            'getAllUsersSuccess',
            'getAllUsersFail',
            'updateUserSuccess',
            'updateUserFail',
            'onUpdateSearchName',
            'onUpdateSearchPhone',
            'addUserSuccess',
            'addUserFail'
        );
        this.userInstance = new UsersTransport();
        this.companyInstance = new CompanyTransport();
    }

    getAllUsers() {
        this.userInstance.getAllUsers().then((response) => {
            _.assign(response, history)
            this.getAllUsersSuccess(response);
        }, (response) => {
            this.getAllUsersFail(response);
        }).then(() => {
            this.companyInstance.getAllCompany().then((response) => {

            });
        });
    }

    updateUser(user) {
        this.userInstance.updateUser(user).then((response) => {
            this.updateUserSuccess(response);
        }, (response) => {
            this.updateUserFail(response);
        });
    }

    addUser(user) {
        this.userInstance.addUser(user).then((response) => {
            this.addUserSuccess(response);
        }, (response) => {
            this.addUserFail(response);
        });
    }
}

export default alt.createActions(UsersActions);