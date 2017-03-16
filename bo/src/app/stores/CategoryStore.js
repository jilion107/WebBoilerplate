/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import CategoryActions from '../actions/CategoryActions';
import { message } from 'antd';
import Util from '../common/Util';

class CategoryStore {
    constructor() {
        this.bindActions(CategoryActions);
        this.state = {
            dataSource: [],
            isLoad: false,
            categoryName: ''
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
                    value: item.name,
                    changeable: true
                },
                createTime: {
                    editable: false,
                    value: item.createTime,
                    changeable: false
                }
            }
        });
    }

    onGetAllCategoriesSuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }

    onUpdateCategorySuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateCategoryFail(data) {
        message.error('修改失败: ' + data);
        setTimeout(function() {
            Util.changLocation("/home/categories")
        }, 500);
    }

    onUpdateCategoryName(event) {
        this.setState({
            categoryName: event.target.value
        });
    }

    onAddCategorySuccess(data) {
        message.info('添加成功: ' + data.categoryName);
        let dataSource = [...this.state.dataSource];
        let newCategory = {
            key: dataSource.length,
            id: {
                editable: false,
                value: data.id,
                changeable: false
            },
            categoryName: {
                editable: false,
                value: data.categoryName,
                changeable: true
            }
        };
        this.setState({
            dataSource: [...dataSource, newCategory]
        });
    }

    onAddCategoryFail(data) {
        message.error(data);
    }

    onDeleteCategorySuccess(data) {
        message.info('删除成功. ');
        const dataSource = [...this.state.dataSource];
        dataSource.splice(data.index, 1);
        this.setState({ dataSource });

    }

    onDeleteCategoryFail(data) {
        message.error('删除失败: ' + data);
    }
}

export default alt.createStore(CategoryStore);