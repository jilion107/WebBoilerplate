/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import SizeActions from '../actions/SizeActions';
import { message } from 'antd';
import Util from '../common/Util';

class SizeStore {
    constructor() {
        this.bindActions(SizeActions);
        this.state = {
            dataSource: [],
            isLoad: false,
            sizeName: ''
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
                sizeName: {
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

    onGetAllSizesSuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }

    onUpdateSizeSuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateSizeFail(data) {
        message.error('修改失败: ' + data);
        setTimeout(function() {
            Util.changLocation("/home/sizes")
        }, 500);
    }

    onUpdateSizeName(event) {
        this.setState({
            sizeName: event.target.value
        });
    }

    onAddSizeSuccess(data) {
        message.info('添加成功: ' + data.sizeName);
        let dataSource = [...this.state.dataSource];
        let newSize = {
            key: dataSource.length,
            id: {
                editable: false,
                value: data.id,
                changeable: false
            },
            sizeName: {
                editable: false,
                value: data.sizeName,
                changeable: true
            }
        };
        this.setState({
            dataSource: [...dataSource, newSize]
        });
    }

    onAddSizeFail(data) {
        message.error(data);
    }

    onDeleteSizeSuccess(data) {
        message.info('删除成功. ');
        const dataSource = [...this.state.dataSource];
        dataSource.splice(data.index, 1);
        this.setState({ dataSource });

    }

    onDeleteSizeFail(data) {
        message.error('删除失败: ' + data);
    }
}

export default alt.createStore(SizeStore);