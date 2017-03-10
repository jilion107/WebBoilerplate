/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';

class SizeTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllSizes() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/sizes',
            requestBody: {}
        });
    }

    updateSize(size) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/sizes/' + size.id,
            requestBody: JSON.stringify(size),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addSize(size) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/size',
            requestBody: JSON.stringify(size),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default SizeTransport;