/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import SizeActions from '../actions/SizeActions';
import { message } from 'antd';

class SizeStore {
    constructor() {
        this.bindActions(SizeActions);
        this.state = {
            sizes: [],
            isLoad: false,
            sizeName: ''
        }
    }

    onGetAllSizesSuccess(data) {
        this.setState({
            sizes: data,
            isLoad: true
        });
    }

    onUpdateSizeSuccess(data) {
        message.info('修改成功: ' + data.name);
    }

    onUpdateSizeFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateSizeName(event) {
        this.setState({
            sizeName: event.target.value
        });
    }

    onAddSizeSuccess(data) {
        message.info('添加成功: ' + data.name);
    }

    onAddSizeFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(SizeStore);