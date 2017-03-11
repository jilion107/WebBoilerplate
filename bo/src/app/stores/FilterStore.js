/**
 * Created by Jilion on 2017/3/11.
 */
import alt from '../common/alt';
import FilterActions from '../actions/FilterActions';
import { message } from 'antd';

class FilterStore {
    constructor() {
        this.bindActions(FilterActions);
        this.state = {
            filters: [],
            isLoad: false,
            filterName: ''
        }
    }

    onGetAllFiltersSuccess(data) {
        this.setState({
            filters: data,
            isLoad: true
        });
    }

    onUpdateFilterSuccess(data) {
        message.info('修改成功: ' + data.name);
    }

    onUpdateFilterFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateFilterName(event) {
        this.setState({
            filterName: event.target.value
        });
    }

    onAddFilterSuccess(data) {
        message.info('添加成功: ' + data.name);
    }

    onAddFilterFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(FilterStore);