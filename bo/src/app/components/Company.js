/**
 * Created by jilion.chen on 3/8/2017.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import CompanyStore from '../stores/CompanyStore';
import CompanyActions from '../actions/CompanyActions';

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

    handleAdd() {
        let { companies, companyName } = this.state;
        let company = CompanyActions.addCompany({ companyName: companyName });
        let newCompany = {
            key: companies.length,
            id: {
                editable: false,
                value: company.id,
                changeable: false
            },
            companyName: {
                editable: false,
                value: company.companyName,
                changeable: true
            }
        };
        this.setState({
            companies: [...companies, newCompany]
        });
    }

    handleUpdate(data) {
        let company = this.state.companies.find((item) => {
            return item.id === data.id.value;
        });
        company.companyName = data.companyName.value
        CompanyActions.updateCompany(company);
    }

    handleDelete(data){
        CompanyActions.deleteCompany(data.id.value);
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

    render() {
        const { getFieldDecorator } = this.props.form;
        let companies = this.state.companies;
        let dataSource = this.createDataSource(companies);
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
                <Form layout="inline" onSubmit={this.handleAdd.bind(this)}>
                    <FormItem label="公司名">
                        {getFieldDecorator('companyname', {
                            rules: [{ required: true, message: '请输入公司名！'}]
                        })(
                            <Input size="large"  onChange={CompanyActions.onUpdateCompanyName}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </FormItem>
                </Form>
                <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.handleUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 2 }/>
            </div> : null
        );
    }

}

let Company = Form.create()(CompanyPage);
export default Company;