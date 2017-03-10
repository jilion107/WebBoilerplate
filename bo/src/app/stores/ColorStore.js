/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import ColorActions from '../actions/ColorActions';
import { message } from 'antd';

class ColorStore {
    constructor() {
        this.bindActions(ColorActions);
        this.state = {
            colors: [],
            isLoad: false,
            colorName: ''
        }
    }

    onGetAllColorsSuccess(data) {
        this.setState({
            colors: data,
            isLoad: true
        });
    }

    onUpdateColorSuccess(data) {
        message.info('修改成功: ' + data.name);
    }

    onUpdateColorFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateColorName(event) {
        this.setState({
            colorName: event.target.value
        });
    }

    onAddColorSuccess(data) {
        message.info('添加成功: ' + data.name);
    }

    onAddColorFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(ColorStore);