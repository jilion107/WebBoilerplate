/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class ColourTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllColours() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/colours',
            requestBody: {}
        });
    }

    updateColour(colour) {
        return this.ajaxRequest({
            method: 'put',
            url: RESTAPI_HOST + '/api/colours/' + colour.id,
            requestBody: JSON.stringify(colour),
            headers: HEARDS
        });
    }

    addColour(colour) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/colour',
            requestBody: JSON.stringify(colour),
            headers: HEARDS
        });
    }

    deleteColour(colourId) {
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/colours/' + colourId,
            requestBody: {},
            headers: HEARDS
        });
    }
}

export default ColourTransport;