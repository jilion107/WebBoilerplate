/**
 * Created by jilion.chen on 3/13/2017.
 */
import Transport from '../common/Transport';

class TortProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTortProducts() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/tortProducts',
            requestBody: {}
        });
    }
}

export default TortProductsTransport;