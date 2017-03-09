/**
 * Created by Jilion on 2017/3/9.
 */
import Transport from '../common/Transport';

class UsersTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllUsers() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/users',
            requestBody: {}
        });
    }

    updateUser(user) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/users/' + user.id,
            requestBody: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default UsersTransport;