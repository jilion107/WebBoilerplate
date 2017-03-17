/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';

class TortWordsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTortWords() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/tortWords',
            requestBody: {}
        });
    }

    updateTortWord(tortWord) {
        return this.ajaxRequest({
            method: 'put',
            url: 'http://localhost:8080/api/tortWords/' + tortWord.id,
            requestBody: JSON.stringify(tortWord),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addTortWord(tortWord) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/tortWord',
            requestBody: JSON.stringify(tortWord),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    deleteTortWord(tortWordId) {
        return this.ajaxRequest({
            method: 'delete',
            url: 'http://localhost:8080/api/tortWords/' + tortWordId,
            requestBody: {},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default TortWordsTransport;