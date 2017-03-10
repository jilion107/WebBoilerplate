/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';

class ColorTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllColors() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/colors',
            requestBody: {}
        });
    }

    updateColor(color) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/colors/' + color.id,
            requestBody: JSON.stringify(color),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addColor(color) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/color',
            requestBody: JSON.stringify(color),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default ColorTransport;