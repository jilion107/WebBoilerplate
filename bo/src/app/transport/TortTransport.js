/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';

class TortTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTorts() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/torts',
            requestBody: {}
        });
    }

    updateTort(tort) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/torts/' + tort.id,
            requestBody: JSON.stringify(tort),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addTort(tort) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/tort',
            requestBody: JSON.stringify(tort),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default TortTransport;