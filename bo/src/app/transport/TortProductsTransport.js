/**
 * Created by jilion.chen on 3/13/2017.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class TortProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTortProducts() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/tortProducts',
            requestBody: {}
        });
    }
}

export default TortProductsTransport;