/**
 * Created by jilion.chen on 3/12/2017.
 */
import Transport from '../common/Transport';

class FormalProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllFormalProducts() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/formalProducts',
            requestBody: {}
        });
    }
}

export default FormalProductsTransport;