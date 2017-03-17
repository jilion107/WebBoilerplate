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
            'onUpdateSearchPhone',
            'addUserSuccess',
            'addUserFail',
            'getUserSuccess',
            'getUserFail',
            'deleteUserSuccess',
            'deleteUserFail'
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

    updateUser(user, dataSource, isCancel) {
        if(isCancel) {
            this.updateUserSuccess({
                dataSource: dataSource,
                isCancel: isCancel
            });
        } else {
            this.userInstance.updateUser(user).then((response) => {
                if(response.result === "fail") {
                    this.updateUserFail(response.message);
                } else {
                    this.updateUserSuccess(response.user);
                }
            }, (response) => {
                this.updateUserFail(response);
            });
        }
    }

    addUser(user) {
        this.userInstance.addUser(user).then((response) => {
            if(response.result === "fail") {
                this.addUserFail(response.message);
            } else {
                this.addUserSuccess(response);
            }
        }, (response) => {
            this.addUserFail(response);
        });
    }

    getUserById(id) {
        this.userInstance.getUser(id).then((response) => {
            if(response.result === "fail") {
                this.getUserFail(response.message);
            } else {
                this.getUserSuccess(response.user);
            }
        }, (response) => {
            this.getUserFail(response);
        });
    }

    deleteUser(index, userId) {
        this.userInstance.deleteUser(userId).then((response) => {
            if(response.result === "fail") {
                this.deleteUserFail(response.message);
            } else {
                response = { index: index };
                this.deleteUserSuccess(response);
            }
        }, (response) => {
            this.deleteUserFail(response);
        });
    }
}

export default alt.createActions(UsersActions);