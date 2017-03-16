/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import ColourActions from '../actions/ColourActions';
import { message } from 'antd';
import Util from '../common/Util';

class ColourStore {
    constructor() {
        this.bindActions(ColourActions);
        this.state = {
            dataSource: [],
            isLoad: false,
            colourName: ''
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
                colourName: {
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

    onGetAllColoursSuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }

    onUpdateColourSuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateColourFail(data) {
        message.error('修改失败: ' + data);
        setTimeout(function() {
            Util.changLocation("/home/companies")
        }, 500);
    }

    onUpdateColourName(event) {
        this.setState({
            colourName: event.target.value
        });
    }

    onAddColourSuccess(data) {
        message.info('添加成功: ' + data.colourName);
        let dataSource = [...this.state.dataSource];
        let newColour = {
            key: dataSource.length,
            id: {
                editable: false,
                value: data.id,
                changeable: false
            },
            colourName: {
                editable: false,
                value: data.colourName,
                changeable: true
            }
        };
        this.setState({
            dataSource: [...dataSource, newColour]
        });
    }

    onAddColourFail(data) {
        message.error(data);
    }

    onDeleteColourSuccess(data) {
        message.info('删除成功. ');
        const dataSource = [...this.state.dataSource];
        dataSource.splice(data.index, 1);
        this.setState({ dataSource });

    }

    onDeleteColourFail(data) {
        message.error('删除失败: ' + data);
    }
}

export default alt.createStore(ColourStore);