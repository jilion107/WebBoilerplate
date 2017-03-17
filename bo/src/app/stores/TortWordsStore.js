/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import TortWordsActions from '../actions/TortWordsActions';
import { message } from 'antd';
import Util from '../common/Util';

class TortWordsStore {
    constructor() {
        this.bindActions(TortWordsActions);
        this.state = {
            dataSource: [],
            isLoad: false,
            tortWordName: ''
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
                tortWordName: {
                    editable: false,
                    value: item.tortWordName,
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

    onGetAllTortWordsSuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }

    onUpdateTortWordSuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateTortWordFail(data) {
        message.error('修改失败: ' + data);
        setTimeout(function() {
            Util.changLocation("/home/tortWords")
        }, 500);
    }

    onUpdateTortWordName(event) {
        this.setState({
            tortWordName: event.target.value
        });
    }

    onAddTortWordSuccess(data) {
        message.info('添加成功: ' + data.tortWordName);
        let dataSource = [...this.state.dataSource];
        let newTortWord = {
            key: dataSource.length,
            id: {
                editable: false,
                value: data.id,
                changeable: false
            },
            tortWordName: {
                editable: false,
                value: data.tortWordName,
                changeable: true
            },
            createTime: {
                editable: false,
                value: data.createTime,
                changeable: false
            }
        };
        this.setState({
            dataSource: [...dataSource, newTortWord]
        });
    }

    onAddTortWordFail(data) {
        message.error(data);
    }

    onDeleteTortWordSuccess(data) {
        message.info('删除成功. ');
        const dataSource = [...this.state.dataSource];
        dataSource.splice(data.index, 1);
        this.setState({ dataSource });

    }

    onDeleteTortWordFail(data) {
        message.error('删除失败: ' + data);
    }
}

export default alt.createStore(TortWordsStore);