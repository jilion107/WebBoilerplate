/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import TortActions from '../actions/TortActions';
import { message } from 'antd';

class TortStore {
    constructor() {
        this.bindActions(TortActions);
        this.state = {
            torts: [],
            isLoad: false,
            tortName: ''
        }
    }

    onGetAllTortsSuccess(data) {
        this.setState({
            torts: data,
            isLoad: true
        });
    }

    onUpdateTortSuccess(data) {
        message.info('修改成功: ' + data.name);
    }

    onUpdateTortFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateTortName(event) {
        this.setState({
            tortName: event.target.value
        });
    }

    onAddTortSuccess(data) {
        message.info('添加成功: ' + data.name);
    }

    onAddTortFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(TortStore);