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
            companies: [],
            isLoad: false,
            companyName: ''
        }
    }

    onGetAllCompanySuccess(data) {
        this.setState({
            companies: data,
            isLoad: true
        });
    }

    onUpdateCompanySuccess(data) {
        message.info('修改成功: ' + data.companyName);
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
    }

    onAddCompanyFail(data) {
        message.error('修改: ' + data + ' 请联系管理员');
    }
}

export default alt.createStore(CompanyStore);