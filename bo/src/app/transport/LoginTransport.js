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
            method: 'post',
            url: 'http://localhost:8080/api/login',
            requestBody: JSON.stringify({
                loginName: name,
                password: password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

}

export default LoginTransport;