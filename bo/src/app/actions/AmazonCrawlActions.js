/**
 * Created by jilion.chen on 5/13/2017.
 */
import alt from '../common/alt';
import AmazonCrawlTransport from '../transport/AmazonCrawlTransport';
import _ from 'underscore';

class AmazonCrawlActions {
    constructor() {
        this.generateActions(
            'crawlSuccess',
            'crawlFail',
            'apiCrawlSuccess',
            'apiCrawlFail',
            'updateKeyword',
            'onUpdateKeyword'
        );
        this.amazonCrawlInstance = new AmazonCrawlTransport();
    }

    crawl(keyword) {
        this.amazonCrawlInstance.crawl(keyword).then((response) => {
            _.assign(response, history)
            this.crawlSuccess(response);
        }, (response) => {
            this.crawlFail(response);
        });
    }

    apiCrawl(keyword) {
        this.amazonCrawlInstance.apiCrawl(keyword).then((response) => {
            _.assign(response, history)
            this.apiCrawlSuccess(response);
        }, (response) => {
            this.apiCrawlFail(response);
        });
    }
}

export default alt.createActions(AmazonCrawlActions);