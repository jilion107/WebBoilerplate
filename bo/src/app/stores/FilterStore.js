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
            dataSource: [],
            isLoad: false,
            searchName: '',
            filterInfo: {
                categoryId: '',
                colourId: '',
                sizeId: ''
            },
            isAddSuccess: false
        }
    }

    createDataSource(store) {
        return store.map((item, index) => {
            return {
                key: index,
                id: {
                    editable: false,
                    value: item.id,
                    changeable: false
                },
                categoryName: {
                    editable: false,
                    value: item.category.name,
                    changeable: true
                },
                colourName: {
                    editable: false,
                    value: item.colour.name,
                    changeable: true
                },
                sizeName: {
                    editable: false,
                    value: item.size.name,
                    changeable: true
                }
            }
        });
    }

    onGetAllFiltersSuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }

    onUpdateFilterSuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateFilterFail(data) {
        message.error('修改失败: ' + data);
    }

    onUpdateFilterName(event) {
        this.setState({
            searchName: event.target.value
        });
    }

    onAddFilterSuccess(data) {
        message.info('添加成功: ' + data.user.loginName);
        this.setState({ isAddSuccess: true });
    }

    onAddFilterFail(data) {
        message.error('添加失败: ' + data);
    }

    onDeleteFilterSuccess(data) {
        message.info('删除成功. ');
        const dataSource = [...this.state.dataSource];
        dataSource.splice(data.index, 1);
        this.setState({ dataSource });
    }

    onDeleteUserFail(data) {
        message.error('删除失败: ' + data);
    }
}

export default alt.createStore(FilterStore);