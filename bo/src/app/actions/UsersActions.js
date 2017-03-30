/**
 * Created by Jilion on 2017/3/9.
 */
import alt from '../common/alt';
import UsersTransport from '../transport/UsersTransport';
import _ from 'underscore';
import CompanyTransport from '../transport/CompanyTransport';

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
            'deleteUserFail',
			'searchUsersSuccess',
			'searchUsersFail'
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
                    response = _.assign(response, {
                        dataSource: dataSource,
                        isCancel: isCancel
                    });
                    this.updateUserSuccess(response);
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
        let getCompanies = this.companyInstance.getAllCompany();
        let getUser = this.userInstance.getUser(id);
        Promise.all([getUser, getCompanies]).then((response) => {
            this.getUserSuccess(response);
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
	
    searchUsers(query) {
        this.userInstance.searchUsers(query).then((response) => {
            _.assign(response, history)
            this.searchUsersSuccess(response.users);
        }, (response) => {
            this.searchUsersFail(response);
        });
    }	
}

export default alt.createActions(UsersActions);