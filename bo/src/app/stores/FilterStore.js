/**
 * Created by Jilion on 2017/3/11.
 */
import alt from '../common/alt';
import FilterActions from '../actions/FilterActions';
import SizeActions from '../actions/SizeActions';
import CategoryActions from '../actions/CategoryActions';
import ColourActions from '../actions/ColourActions';
import { message } from 'antd';
import Util from '../common/Util';

class FilterStore {
    constructor() {
        this.bindActions([FilterActions, SizeActions, CategoryActions, ColourActions]);
        this.state = {
            dataSource: [],
            isLoad: false,
            searchName: '',
            filterInfo: {
                categoryId: '',
                colourId: '',
                sizeId: ''
            },
            isAddSuccess: false,
            modalType: null,
            modalVisible: false,
            sizes: [],
            categories: [],
            colours: []
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
                    value: item.categoryName,
                    changeable: false
                },
                colourName: {
                    editable: false,
                    value: item.colourName,
                    changeable: false
                },
                sizeName: {
                    editable: false,
                    value: item.sizeName,
                    changeable: false
                },
                createTime: {
                    editable: false,
                    value: item.createTime,
                    changeable: false
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

    onGetAllSizesSuccess(data) {
        this.setState({
            sizes: data
        });
    }

    onGetAllColoursSuccess(data) {
        this.setState({
            colours: data
        });
    }

    onGetAllCategoriesSuccess(data) {
        this.setState({
            categories: data
        });
    }

    onUpdateFilterSuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateFilterFail(data) {
        message.error('修改失败: ' + data);
    }

    onUpdateSearchName(event) {
        this.setState({
            searchName: event.target.value
        });
    }

    onAddFilterSuccess(data) {
        message.info('添加成功: ' + data.filter.loginName);
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