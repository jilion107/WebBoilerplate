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
        this.bindActions(FilterActions);
        this.state = {
            dataSource: [],
            isLoad: false,
            searchName: '',
            filterInfo: {
                id: '',
                productCategoryId: '',
                productColourId: '',
                productSizeId: ''
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
                    value: item.productCategoryName,
                    changeable: false
                },
                colourName: {
                    editable: false,
                    value: item.productColourName,
                    changeable: false
                },
                sizeName: {
                    editable: false,
                    value: item.productSizeName,
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
            sizes: data[0],
            categories: data[1],
            colours: data[2],
            dataSource: this.createDataSource(data[3]),
            isLoad: true
        });
    }

    onUpdateFilterSuccess(data) {
        message.info('修改成功. ');
        Util.changLocation("/home/filters")
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
        message.info('添加成功!');
        let dataSource = [...this.state.dataSource];
        let newFilter = {
            key: dataSource.length,
            id: {
                editable: false,
                value: data.id,
                changeable: false
            },
            categoryName: {
                editable: false,
                value: data.productCategoryName,
                changeable: false
            },
            colourName: {
                editable: false,
                value: data.productColourName,
                changeable: false
            },
            sizeName: {
                editable: false,
                value: data.productSizeName,
                changeable: false
            },
            createTime: {
                editable: false,
                value: data.createTime,
                changeable: false
            }
        };
        this.setState({
            dataSource: [...dataSource, newFilter],
            modalVisible: false
        });
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