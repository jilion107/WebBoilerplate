/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import TortWordsActions from '../actions/TortWordsActions';
import { message } from 'antd';

class TortWordsStore {
    constructor() {
        this.bindActions(TortWordsActions);
        this.state = {
            tortWords: [],
            isLoad: false,
            tortWordName: ''
        }
    }

    onGetAllTortWordsSuccess(data) {
        this.setState({
            tortWords: data,
            isLoad: true
        });
    }

    onUpdateTortWordSuccess(data) {
        message.info('修改成功: ' + data.name);
    }

    onUpdateTortWordFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateTortWordName(event) {
        this.setState({
            tortWordName: event.target.value
        });
    }

    onAddTortWordSuccess(data) {
        message.info('添加成功: ' + data.name);
    }

    onAddTortWordFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(TortWordsStore);