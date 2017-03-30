/**
 * Created by Jilion on 2017/3/9.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class UsersTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllUsers() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/users/',
            requestBody: {}
        });
    }

    updateUser(user) {
        return this.ajaxRequest({
            method: 'put',
            url: RESTAPI_HOST + '/api/users/' + user.id,
            requestBody: JSON.stringify(user),
            headers: HEARDS
        });
    }

    addUser(user) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/user',
            requestBody: JSON.stringify(user),
            headers: HEARDS
        });
    }

    getUser(id) {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/users/' + id
        });
    }

    deleteUser(userId) {
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/users/' + userId,
            requestBody: {},
            headers: HEARDS
        });
    }
	
    searchUsers(query) {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/users?' + query.field + '=' + query.keyword
        });
    }	

}

export default UsersTransport;