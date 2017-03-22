/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class SizeTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllSizes() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/sizes',
            requestBody: {}
        });
    }

    updateSize(size) {
        return this.ajaxRequest({
            method: 'put',
            url: RESTAPI_HOST + '/api/sizes/' + size.id,
            requestBody: JSON.stringify(size),
            headers: HEARDS
        });
    }

    addSize(size) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/size',
            requestBody: JSON.stringify(size),
            headers: HEARDS
        });
    }

    deleteSize(sizeId) {
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/sizes/' + sizeId,
            requestBody: {},
            headers: HEARDS
        });
    }
}

export default SizeTransport;