/**
 * Created by jilion.chen on 3/8/2017.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import CompanyStore from '../stores/CompanyStore';
import CompanyActions from '../actions/CompanyActions';
import { message } from 'antd';

const FormItem = Form.Item;

class CompanyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = CompanyStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        CompanyStore.listen(this.onChange);
        CompanyActions.getAllCompany();
    }

    componentWillUnmount() {
        CompanyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd(e) {
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error('公司名称不能为空！');
                e.preventDefault();
            } else {
                CompanyActions.addCompany({ companyName: this.state.companyName });
            }
        });
    }

    handleUpdate(data, index) {
        let rawCompany = data[index];
        let newCompany = {};
        let isCancel = false;
        Object.keys(rawCompany).forEach((prop) => {
            if(prop !== "key") {
                newCompany[prop] = rawCompany[prop].value
                if(rawCompany[prop].status === "cancel") {
                    isCancel = true;
                }
            }
        });
        CompanyActions.updateCompany(newCompany, data, isCancel);
    }

    handleDelete(index){
        let companyId = this.state.dataSource[index]["id"].value;
        CompanyActions.deleteCompany(index, companyId);
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        let dataSource = this.state.dataSource;
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '10%'
            }, {
                title: '公司名',
                dataIndex: 'companyName',
                width: '50%'
            }, {
                title: '操作',
                dataIndex: 'operation'
            }
        ];

        return ( this.state.isLoad ?
            <div>
                <Form layout="inline">
                    <FormItem label="公司名">
                        {getFieldDecorator('companyname', {
                            rules: [{ required: true, message: '请输入公司名！'}]
                        })(
                            <Input size="large"  onChange={CompanyActions.onUpdateCompanyName}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.handleAdd.bind(this)}>添加</Button>
                    </FormItem>
                </Form>
                <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.handleUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 2 }/>
            </div> : null
        );
    }

}

let Company = Form.create()(CompanyPage);
export default Company;