/**
 * Created by jilion.chen on 3/12/2017.
 */
import Transport from '../common/Transport';

class TmpProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTmpProducts() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/tmpProducts',
            requestBody: {}
        });
    }
}

export default TmpProductsTransport;