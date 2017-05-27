/**
 * Created by jilion.chen on 5/13/2017.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class AmazonCrawlTransport extends Transport {
    constructor(props) {
        super(props);
    }

    crawl(keyword) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/crawl?keyword=' + keyword,
            headers: HEARDS
        });
    }

    apiCrawl(keyword) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/apiCrawl?keyword=' + keyword,
            headers: HEARDS
        });
    }
}

export default AmazonCrawlTransport;