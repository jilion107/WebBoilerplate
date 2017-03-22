/**
 * Created by jilion.chen on 2/28/2017.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class LoginTransport extends Transport{
    constructor(props) {
        super(props);
    }

    login(name, password) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/login',
            requestBody: JSON.stringify({
                loginName: name,
                password: password
            }),
            headers: HEARDS
        });
    }

}

export default LoginTransport;