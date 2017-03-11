/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import ColourActions from '../actions/ColourActions';
import { message } from 'antd';

class ColourStore {
    constructor() {
        this.bindActions(ColourActions);
        this.state = {
            colours: [],
            isLoad: false,
            colourName: ''
        }
    }

    onGetAllColoursSuccess(data) {
        this.setState({
            colours: data,
            isLoad: true
        });
    }

    onUpdateColourSuccess(data) {
        message.info('修改成功: ' + data.name);
    }

    onUpdateColourFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateColourName(event) {
        this.setState({
            colourName: event.target.value
        });
    }

    onAddColourSuccess(data) {
        message.info('添加成功: ' + data.name);
    }

    onAddColourFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(ColourStore);