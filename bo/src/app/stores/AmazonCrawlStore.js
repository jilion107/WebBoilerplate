/**
 * Created by jilion.chen on 5/13/2017.
 */
import alt from '../common/alt';
import AmazonCrawlActions from '../actions/AmazonCrawlActions';
import { message } from 'antd';
import Util from '../common/Util';

class AmazonCrawlStore {
    constructor() {
        this.bindActions(AmazonCrawlActions);
        this.state = {
            isLoad: true,
            keyword: ''
        }
    }

    onCrawlSuccess(data) {
        this.setState({
            isLoad: true
        });
    }

    onCrawlFail(data) {
        message.error('抓取失败: ' + data);
    }

    onApiCrawlSuccess(data) {
        this.setState({
            isLoad: true
        });
    }

    onApiCrawlFail(data) {
        message.error('抓取失败: ' + data);
    }

    onUpdateKeyword(event) {
        this.setState({
            keyword: event.target.value
        });
    }
}

export default alt.createStore(AmazonCrawlStore);