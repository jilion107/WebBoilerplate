/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import CategoryActions from '../actions/CategoryActions';
import { message } from 'antd';

class CategoryStore {
    constructor() {
        this.bindActions(CategoryActions);
        this.state = {
            categories: [],
            isLoad: false,
            categoryName: ''
        }
    }

    onGetAllCategoriesSuccess(data) {
        this.setState({
            categories: data,
            isLoad: true
        });
    }

    onUpdateCategorySuccess(data) {
        message.info('修改成功: ' + data.name);
    }

    onUpdateCategoryFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateCategoryName(event) {
        this.setState({
            categoryName: event.target.value
        });
    }

    onAddCategorySuccess(data) {
        message.info('添加成功: ' + data.name);
    }

    onAddCategoryFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(CategoryStore);