/**
 * Created by jilion.chen on 3/9/2017.
 */
import alt from '../common/alt';
import ComapnyActions from '../actions/CompanyActions';
import { message } from 'antd';

class CompanyStore {
    constructor() {
        this.bindActions(ComapnyActions);
        this.state = {
            isLoad: false,
            companyName: '',
            dataSource: []
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
                companyName: {
                    editable: false,
                    value: item.companyName,
                    changeable: true
                }
            }
        });
    }

    onGetAllCompanySuccess(data) {
        this.setState({
            dataSource: this.createDataSource(data),
            isLoad: true
        });
    }

    onUpdateCompanySuccess(data) {
        message.info(data.isCancel ? '已取消修改.' : '修改成功. ');
        this.setState({ dataSource : data.dataSource });
    }

    onUpdateCompanyFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }

    onUpdateCompanyName(event) {
      this.setState({
          companyName: event.target.value
      });
    }

    onAddCompanySuccess(data) {
        message.info('添加成功: ' + data.companyName);
        let dataSource = [...this.state.dataSource];
        let newCompany = {
            key: dataSource.length,
            id: {
                editable: false,
                value: data.id,
                changeable: false
            },
            companyName: {
                editable: false,
                value: data.companyName,
                changeable: true
            }
        };
        this.setState({
            dataSource: [...dataSource, newCompany]
        });
    }

    onAddCompanyFail(data) {
        message.error(data);
    }

    onDeleteCompanySuccess(data) {
        message.info('删除成功. ');
        const dataSource = [...this.state.dataSource];
        dataSource.splice(data.index, 1);
        this.setState({ dataSource });

    }

    onDeleteCompanyFail(data) {
        message.error('删除失败: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(CompanyStore);