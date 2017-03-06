/**
 * Created by jilion.chen on 2/28/2017.
 */
import Transport from '../common/Transport';

class LoginTransport extends Transport{
    constructor(props) {
        super(props);
    }

    login(name, password) {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/login',
            requestBody: {
                username: name,
                password: password
            }
        });
    }

}

export default LoginTransport;