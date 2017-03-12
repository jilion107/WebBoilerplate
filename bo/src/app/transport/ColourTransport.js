/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';

class ColourTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllColours() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/product-colour',
            requestBody: {}
        });
    }

    updateColour(colour) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/colours/' + colour.id,
            requestBody: JSON.stringify(colour),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addColour(colour) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/colour',
            requestBody: JSON.stringify(colour),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default ColourTransport;