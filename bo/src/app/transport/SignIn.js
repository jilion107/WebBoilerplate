/**
 * Created by jilion.chen on 2/28/2017.
 */
import Transport from '../common/Trans';

class SinIn extends Transport {
    constructor(props) {
        super(props);
    }

    login(name, password) {
        return this.ajaxRequest({
            method: 'post',
            url: '/api/login',
            requestBody: {
                name: name,
                password: password
            }
        });
    }

}

export default SinIn;