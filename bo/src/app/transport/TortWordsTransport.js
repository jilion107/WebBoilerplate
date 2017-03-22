/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class TortWordsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTortWords() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/tortWords',
            requestBody: {}
        });
    }

    updateTortWord(tortWord) {
        return this.ajaxRequest({
            method: 'put',
            url: RESTAPI_HOST + '/api/tortWords/' + tortWord.id,
            requestBody: JSON.stringify(tortWord),
            headers: HEARDS
        });
    }

    addTortWord(tortWord) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/tortWord',
            requestBody: JSON.stringify(tortWord),
            headers: HEARDS
        });
    }

    deleteTortWord(tortWordId) {
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/tortWords/' + tortWordId,
            requestBody: {},
            headers: HEARDS
        });
    }
}

export default TortWordsTransport;